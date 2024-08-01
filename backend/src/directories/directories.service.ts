import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { UpdateDirectoryDto } from './dto/update-directory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Directory } from '@prisma/client';
import { StorageService } from 'src/storage/storage.service';
import { join } from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DirectoriesService {
  constructor(
    private prisma: PrismaService,
    private storage: StorageService,
  ) {}
  async create(id: string, dto: CreateDirectoryDto) {
    let parentDirectory: Directory;
    try {
      if (!dto.parentId) {
        parentDirectory = await this.prisma.directory.findFirst({
          where: { name: id, ownerId: id },
        });
      } else {
        parentDirectory = await this.prisma.directory.findUnique({
          where: { id: dto.parentId, ownerId: id },
        });
      }
      if (!parentDirectory) {
        throw new BadRequestException(
          'parent directory with that id and owner not found',
        );
      }
      const path: string = join(parentDirectory.path, uuid());

      const directory = await this.prisma.directory.create({
        data: {
          name: dto.name,
          path: path,
          owner: {
            connect: {
              id,
            },
          },
          parent: { connect: { id: parentDirectory.id } },
        },
      });
      await this.storage.createDirectory(path);
      return directory;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException('need unique name');
        }
      }
      throw e;
    }
  }

  async findAll(ownerId: string, page: number) {
    if (!page) page = 0;
    return await this.prisma.directory.findFirst({
      where: {
        ownerId,
        name: ownerId,
      },
      include: {
        files: true,
        children: true,
      },
    });
  }

  async findOne(ownerId: string, id: string) {
    const directories = await this.prisma.directory.findUnique({
      where: { ownerId, id },
      include: { files: true, children: true },
    });
    if (!directories) {
      throw new BadRequestException(
        'directories with that parent and owner not found',
      );
    }
    return directories;
  }

  async update(ownerId: string, updateDirectoryDto: UpdateDirectoryDto) {
    const directory = await this.prisma.directory.update({
      where: {
        ownerId,
        id: updateDirectoryDto.id,
      },
      data: {
        name: updateDirectoryDto.name,
      },
    });
    if (!directory) {
      throw new BadRequestException(
        'directory with that id and owner not found',
      );
    }
    return directory;
  }

  async remove(ownerId: string, id: string) {
    const directory = await this.prisma.directory.findUnique({
      where: {
        id,
        ownerId,
      },
      include: {
        files: true,
      },
    });
    if (!directory) {
      throw new BadRequestException(
        'directory with that id and owner not found',
      );
    }
    await this.storage.deleteDirectory(directory.path);
    await this.prisma.user.update({
      where: { id: ownerId },
      data: { usedSpace: await this.storage.dirSize(ownerId) },
    });
    await this.prisma.directory.delete({ where: { id, ownerId } });
    return directory;
  }
}
