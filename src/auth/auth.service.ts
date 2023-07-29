import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async register(dto: AuthDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: dto.password,
        },
      });
      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
      }
    }
  }
}
