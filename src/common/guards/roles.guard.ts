import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRolesEnum } from '../enums/UserRolesEnum';
import { getDataFromToken } from 'src/auth/helpers/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = UserRolesEnum.Admin;
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return false;

    try {
      const role = await getDataFromToken(token, 'role');

      if (role === requiredRole) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }
}
