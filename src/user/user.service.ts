import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsersList() {
    return await this.prisma.user.findMany();
  }

  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      const { password, ...userData } = user;
      return userData;
    } else throw new NotFoundException('There is no user with provided id');
  }
}
