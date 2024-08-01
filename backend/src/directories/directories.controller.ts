import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { UpdateDirectoryDto } from './dto/update-directory.dto';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('directories')
export class DirectoriesController {
  constructor(private readonly directoriesService: DirectoriesService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  create(
    @GetUser('id') ownerId: string,
    @Body() createDirectoryDto: CreateDirectoryDto,
  ) {
    return this.directoriesService.create(ownerId, createDirectoryDto);
  }

  @Get('get')
  @UseGuards(JwtGuard)
  findAll(@GetUser('id') ownerId: string, @Query('page') page: number) {
    return this.directoriesService.findAll(ownerId, page);
  }

  @Get('get/:id')
  @UseGuards(JwtGuard)
  findOne(@GetUser('id') ownerId: string, @Param('id') id: string) {
    return this.directoriesService.findOne(ownerId, id);
  }

  @Patch('update')
  @UseGuards(JwtGuard)
  update(
    @GetUser('id') ownerId: string,
    @Body() updateDirectoryDto: UpdateDirectoryDto,
  ) {
    return this.directoriesService.update(ownerId, updateDirectoryDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtGuard)
  remove(@GetUser('id') ownerId: string, @Param('id') id: string) {
    return this.directoriesService.remove(ownerId, id);
  }
}
