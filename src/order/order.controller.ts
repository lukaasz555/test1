import {
  Controller,
  Get,
  UseGuards,
  Query,
  Body,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { GetOrdersDto } from './dto';
import { CreateOrderDto } from './dto';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('orders')
  getUserOrders(
    @Query() query: GetOrdersDto,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.orderService.getFilteredOrders(query, userId);
  }

  @Post('orders')
  postOrder(
    @Body() dto: CreateOrderDto,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.orderService.createOrder(dto, userId);
  }

  @Get('admin/orders')
  @UseGuards(RolesGuard)
  getAdminOrders(@Query() query: GetOrdersDto) {
    return this.orderService.getFilteredOrders(query);
  }
}
