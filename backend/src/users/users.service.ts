import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
      include: { _count: { select: { files: true, directories: true } } },
    });
  }
}
