import {
  BadRequestException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFileDto } from './dto/create-file.dto';
import { Directory, Types } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createReadStream } from 'fs';
import { UpdateFileDto } from './dto/update-file.dto';
import { StorageService } from 'src/storage/storage.service';
import { join } from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private storage: StorageService,
  ) {}
  async uploadFile(file: Express.Multer.File, id: string, dto: CreateFileDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      let directory: Directory;
      if (dto.directoryId) {
        directory = await this.prisma.directory.findUnique({
          where: { ownerId: id, id: dto.directoryId },
        });
      } else {
        directory = await this.prisma.directory.findFirst({
          where: { ownerId: id, name: id },
        });
      }
      let type: Types = <Types>file.mimetype.split('/')[0];
      if (!(<any>Object).values(Types).includes(type)) {
        type = Types.download;
      }

      if (file.size + user.usedSpace > user.diskSpace) {
        throw new BadRequestException('storage is full');
      }
      if (!directory) {
        throw new BadRequestException('directory not found');
      }
      const path = join(directory.path, uuid());
      const createdFile = await this.prisma.file.create({
        data: {
          name: dto.name ?? file.originalname,
          type,
          path: path,
          size: file.size,
          directory: { connect: { id: directory.id } },
          owner: { connect: { id } },
        },
      });
      await this.storage.createFile(file.buffer, path);
      await this.prisma.user.update({
        where: { id },
        data: {
          usedSpace: await this.storage.dirSize(user.id),
        },
      });
      return createdFile;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException('file with this name already exist');
        }
      }
      throw e;
    }
  }
  async get(id: string, ownerId: string) {
    const fileDb = await this.prisma.file.findUnique({
      where: { ownerId, id },
    });
    if (!fileDb) {
      throw new BadRequestException('file with that id and owner not found');
    }
    const file = createReadStream(await this.storage.getPath(fileDb.path));
    return new StreamableFile(file);
  }
  async getAll(ownerId: string) {
    return await this.prisma.file.findMany({
      where: { ownerId, directory: null },
    });
  }
  async update(updateFileDto: UpdateFileDto, ownerId: string) {
    return await this.prisma.file.update({
      where: { ownerId, id: updateFileDto.id },
      data: {
        name: updateFileDto.name,
      },
    });
  }
  async remove(id: string, ownerId: string) {
    const file = await this.prisma.file.delete({
      where: { ownerId, id },
    });
    if (!file) {
      throw new BadRequestException('file with that id and owner not found');
    }
    await this.storage.deleteFile(file.path);
    await this.prisma.user.update({
      where: { id: ownerId },
      data: { usedSpace: await this.storage.dirSize(ownerId) },
    });
    return file;
  }
}
