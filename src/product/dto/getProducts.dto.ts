import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetProductsDto {
  @IsString()
  @IsNotEmpty()
  limit: string;

  @IsString()
  @IsNotEmpty()
  page: string;

  @IsString()
  @IsOptional()
  searchValue?: string;

  @IsOptional()
  sortDesc?: string;
}
