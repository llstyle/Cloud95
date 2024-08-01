import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { DirectoriesModule } from './directories/directories.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    UsersModule,
    AuthModule,
    FilesModule,
    DirectoriesModule,
    StorageModule,
  ],
})
export class AppModule {}
