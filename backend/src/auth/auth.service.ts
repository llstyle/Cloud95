import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
    private prisma: PrismaService,
    private storage: StorageService,
  ) {}
  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');
    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signedToken(user.id, user.email);
  }
  async signup(dto: AuthDto) {
    try {
      const password = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password,
        },
      });
      await this.storage.createUserDirectory(user.id);
      await this.prisma.directory.create({
        data: {
          name: user.id,
          owner: { connect: { id: user.id } },
          path: user.id,
        },
      });
      return this.signedToken(user.id, user.email);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw e;
    }
  }
  async signedToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: secret,
    });
    return { access_token: token };
  }
}
