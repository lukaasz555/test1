import { IsOptional } from 'class-validator';
import { PaginationDataDto } from 'src/common/dtos/PaginationData.dto';

export class GetOrdersDto extends PaginationDataDto {
  @IsOptional()
  maxDate?: string;

  @IsOptional()
  lowDate?: string;

  @IsOptional()
  maxTotalValue?: string;

  @IsOptional()
  minTotalValue?: string;
}
