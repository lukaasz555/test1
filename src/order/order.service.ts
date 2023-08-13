import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from '@prisma/client';
import { GetOrdersDto, CreateOrderDto } from './dto';
import { PaginationResult } from 'src/common/interfaces/PaginationResult';
import { OrderStatusEnum } from 'src/common/enums/OrderStatus.enum';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getFilteredOrders(query: GetOrdersDto, userId?: number) {
    try {
      const paginationData = {
        skip: (Number(query.page) - 1) * Number(query.limit),
        take: Number(query.limit),
        where: {},
      };

      if (userId) {
        Object.assign(paginationData.where, {
          userId,
        });
      }

      if (query.maxTotalValue || query.minTotalValue) {
        const filterByValues = { totalValue: {} };
        if (query.minTotalValue) {
          Object.assign(filterByValues.totalValue, {
            gte: Number(query.minTotalValue),
          });
        }
        if (query.maxTotalValue) {
          Object.assign(filterByValues.totalValue, {
            lte: Number(query.maxTotalValue),
          });
        }
        Object.assign(paginationData.where, filterByValues);
      }

      if (query.maxDate || query.lowDate) {
        const filterByDates = { createdAt: {} };
        if (query.lowDate) {
          Object.assign(filterByDates.createdAt, {
            gte: new Date(query.lowDate),
          });
        }
        if (query.maxDate) {
          Object.assign(filterByDates.createdAt, {
            lte: new Date(query.maxDate),
          });
        }
        Object.assign(paginationData.where, filterByDates);
      }

      const orders: Order[] = await this.prisma.order.findMany(paginationData);
      const totalOrders: number = await this.prisma.order.count(paginationData);

      const res: PaginationResult<Order> = {
        page: Number(query.page),
        limit: Number(query.limit),
        totalRecords: totalOrders,
        totalPages: Math.ceil(totalOrders / +query.limit),
        items: orders,
      };

      return res;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getOrderById(orderId: number) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });

      return order;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getOrdersByUserId(userId: number) {
    try {
      const orders: Order[] = await this.prisma.order.findMany({
        where: {
          userId,
        },
      });

      return orders;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async createOrder(dto: CreateOrderDto, userId: number) {
    try {
      const order = await this.prisma.order.create({
        data: {
          itemsValue: dto.itemsValue,
          totalValue: dto.totalValue,
          shipValue: dto.shipValue,
          productsIds: dto.productsIds,
          status: OrderStatusEnum.New,
          userId,
        },
      });
      return order.id;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  // async editOrder() {}

  // async deleteOrder() {}
}
