import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getOrders() {
    const orders: Order[] = await this.prisma.order.findMany();
    return orders;
  }

  async getOrderById(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    return order;
  }

  async getOrdersByUserId(userId: number) {
    const orders: Order[] = await this.prisma.order.findMany({
      where: {
        userId,
      },
    });

    return orders;
  }

  //  async createOrder() {}

  // async editOrder() {}

  // async deleteOrder() {}
}
