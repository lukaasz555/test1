import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRolesEnum } from 'src/common/enums/UserRoles.enum';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  role: UserRolesEnum;
}
