import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { UserRolesEnum } from 'src/common/enums/UserRolesEnum';
import { signToken } from './helpers/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('There is no such a user');
    }

    if (user) {
      const isPasswordValid = await argon.verify(user.password, dto.password);
      if (isPasswordValid) {
        return signToken(user.id, user.email, user.role);
      } else {
        throw new UnauthorizedException('Wrong credentials');
      }
    }
  }

  async register(dto: RegisterDto) {
    const hashedPassword = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
          lastname: dto.lastname,
          role: UserRolesEnum.User,
        },
      });
      return user.id;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('E-mail must be unique');
        }
        console.log(err);
      } else console.log(err);
    }
  }
}
