import { IsString, IsNotEmpty } from 'class-validator';

export class PaginationDataDto {
  @IsString()
  @IsNotEmpty()
  limit: string;

  @IsString()
  @IsNotEmpty()
  page: string;
}
