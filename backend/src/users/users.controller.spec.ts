import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { IUser } from './interfaces/user.interface';
import { UserEntity } from './entity/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
  it('getMe should return info about me', async () => {
    const user = {
      id: 'id',
      email: 'email',
    };
    const result: IUser = {
      ...user,
      password: 'password',
      diskSpace: 0,
      usedSpace: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'findById').mockImplementation(async () => result);

    expect(await controller.getMe(user.id)).toStrictEqual(
      new UserEntity(result),
    );
  });
});
