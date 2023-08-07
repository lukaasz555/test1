import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRolesEnum } from 'src/common/enums/UserRolesEnum';

const jwt = new JwtService();
const cfg = new ConfigService();

interface User {
  [key: string]: string | number | UserRolesEnum;
}

export async function signToken(
  userId: number,
  email: string,
  role: string,
): Promise<{ token: string }> {
  const payload = {
    sub: userId,
    email,
    role,
  };

  const token = await jwt.signAsync(payload, {
    secret: cfg.get('SECRET_TOKEN'),
  });

  return { token };
}

export async function getDataFromToken(
  token: string,
  data = 'sub',
): Promise<string> {
  const user: User = await jwt.verifyAsync(token, {
    secret: cfg.get('SECRET_TOKEN'),
  });
  return user[data] as string;
}
