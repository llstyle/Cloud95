import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mkdir, readdir, rm, stat, unlink, writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class StorageService {
  private uploadPath: string;
  constructor(private config: ConfigService) {
    this.uploadPath = join(process.cwd(), this.config.get('UPLOAD_FOLDER'));
  }
  async createFile(file: Buffer, path: string) {
    try {
      await writeFile(join(this.uploadPath, path), file);
    } catch (err) {
      throw err;
    }
  }
  async createUserDirectory(name: string) {
    try {
      await mkdir(join(this.uploadPath, name));
    } catch (err) {
      throw err;
    }
  }
  async createDirectory(path: string) {
    try {
      await mkdir(join(this.uploadPath, path));
    } catch (err) {
      throw err;
    }
  }
  async dirSize(dir: string) {
    dir = join(this.uploadPath, dir);
    const size = async (dir: string) => {
      const files = await readdir(dir, { withFileTypes: true });
      const paths = files.map(async (file) => {
        const path = join(dir, file.name);
        if (file.isDirectory()) return await size(path);
        if (file.isFile()) {
          const { size } = await stat(path);
          return size;
        }
        return 0;
      });
      return (await Promise.all(paths))
        .flat(Infinity)
        .reduce((i, size) => i + size, 0);
    };
    return await size(dir);
  }

  async deleteDirectory(dir: string) {
    try {
      await rm(join(this.uploadPath, dir), {
        recursive: true,
        force: true,
      });
    } catch (err) {
      throw err;
    }
  }
  async deleteFile(file: string) {
    try {
      await unlink(join(this.uploadPath, file));
    } catch (err) {
      throw err;
    }
  }
  async getPath(path: string) {
    return join(this.uploadPath, path);
  }
}
