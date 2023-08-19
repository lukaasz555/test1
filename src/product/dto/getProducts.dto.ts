import { IsOptional } from 'class-validator';
import { PaginationDataDto } from 'src/common/dtos/PaginationData.dto';

export class GetProductsDto extends PaginationDataDto {
  //   @IsOptional()
  //   maxPrice?: string;
  //   @IsOptional()
  //   lowPrice?: string;
}
