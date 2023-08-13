import { PaginationDataDto } from 'src/common/dtos/PaginationData.dto';
import { IsOptional, IsString } from 'class-validator';

export class GetProductsDto extends PaginationDataDto {
  @IsString()
  @IsOptional()
  searchValue?: string;

  @IsOptional()
  sortDesc?: string;
}
