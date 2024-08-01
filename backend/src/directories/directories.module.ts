import { Module } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { DirectoriesController } from './directories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [PrismaModule, StorageModule],
  controllers: [DirectoriesController],
  providers: [DirectoriesService],
})
export class DirectoriesModule {}
