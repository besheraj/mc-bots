import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Orders, OrdersDocument } from './database/order.schema';
import { Model } from 'mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Orders.name)
    private orderModel: Model<OrdersDocument>,
    @InjectQueue('orders-queue')
    private readonly orderQueue: Queue,
  ) {}

  status(): string {
    return 'OK';
  }

  private async createOrderNumber() {
    let orderNumber: number;

    const lastestOrder = await this.orderModel
      .find({
        createdAt: {
          $gte: moment().startOf('day').toDate(),
          $lte: moment().endOf('day').toDate(),
        },
      })
      .sort({ createdAt: 'desc' })
      .limit(1)
      .exec();

    if (lastestOrder.length) {
      orderNumber = lastestOrder[0].orderNumber + 1;
      return orderNumber;
    }

    return (orderNumber = parseInt(`${moment().format('MMDDYYYY')}00001`));
  }

  async getOrders() {
    try {
      return this.orderModel.find();
    } catch (e) {
      throw e;
    }
  }

  async createOrder(order: { vip: boolean }) {
    try {
      const orderNumber = await this.createOrderNumber();
      const newOrder = { orderNumber, vip: order.vip, status: 'PENDING' };
      const savedOrder = new this.orderModel(newOrder);
      await savedOrder.save();

      if (order.vip) {
        await this.orderQueue.add(
          'process-order',
          {
            ...newOrder,
          },
          {
            priority: 1,
            attempts: 3,
            backoff: {
              type: 'exponential',
              delay: 1000,
            },
          },
        );
        return 'order in the queue!';
      }

      await this.orderQueue.add(
        'process-order',
        {
          ...newOrder,
        },
        {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
        },
      );

      return 'order in the queue!';
    } catch (e) {
      console.error(e);
    }
  }
}
