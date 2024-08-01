import {
  UseInterceptors,
  UploadedFile,
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  StreamableFile,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Controller('file')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}
  @Post('upload')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Body() createFileDto: CreateFileDto,
    @GetUser('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.uploadFile(file, id, createFileDto);
  }
  @Get('get/:id')
  @UseGuards(JwtGuard)
  getFile(
    @GetUser('id') ownerId: string,
    @Param('id') id: string,
  ): Promise<StreamableFile> {
    return this.fileService.get(id, ownerId);
  }
  @Get('get')
  @UseGuards(JwtGuard)
  getAllFiles(@GetUser('id') ownerId: string) {
    return this.fileService.getAll(ownerId);
  }
  @Patch('update')
  @UseGuards(JwtGuard)
  update(@GetUser('id') ownerId: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(updateFileDto, ownerId);
  }

  @Delete('delete/:id')
  @UseGuards(JwtGuard)
  remove(@GetUser('id') ownerId: string, @Param('id') id: string) {
    return this.fileService.remove(id, ownerId);
  }
}
