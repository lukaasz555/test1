import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  itemsValue: number;

  @IsNotEmpty()
  @IsNumber()
  shipValue: number;

  @IsNotEmpty()
  @IsNumber()
  totalValue: number;

  @IsNotEmpty()
  @IsArray()
  productsIds: number[];
}
