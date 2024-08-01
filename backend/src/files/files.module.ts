import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileDeletedListener } from './listeners/file-deleted.listener';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [PrismaModule, StorageModule],
  controllers: [FilesController],
  providers: [FilesService, FileDeletedListener],
})
export class FilesModule {}
