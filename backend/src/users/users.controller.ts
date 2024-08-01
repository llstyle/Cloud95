import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserEntity } from './entity/user.entity';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('me')
  async getMe(@GetUser('id') id: string): Promise<UserEntity> {
    return new UserEntity(await this.userService.findById(id));
  }
}
