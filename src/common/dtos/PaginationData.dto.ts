import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class PaginationDataDto {
  @IsString()
  @IsNotEmpty()
  limit: string;

  @IsString()
  @IsNotEmpty()
  page: string;

  @IsOptional()
  @IsString()
  searchValue?: string;

  @IsOptional()
  @IsString()
  sortDesc?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;
}
