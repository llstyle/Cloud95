import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
const prismaMock = {
  user: {
    findUnique: jest.fn(),
  },
};

describe('UserService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);

    prismaMock.user.findUnique.mockClear();
  });

  describe('getUserById', () => {
    it('should return user if exists', async () => {
      const existingUser = {
        id: 'uuid',
        email: 'some',
      };

      prismaMock.user.findUnique.mockResolvedValue(existingUser);

      const result = await userService.findById(existingUser.id);
      expect(result).toEqual(existingUser);
      expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: existingUser.id },
      });
    });
  });
});
