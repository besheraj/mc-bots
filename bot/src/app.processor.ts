import { Process, Processor } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Orders, OrdersDocument } from './database/order.schema';
import { Model } from 'mongoose';

@Processor('orders-queue')
export class ProcessOrders {
  constructor(
    @InjectModel(Orders.name)
    private orderModel: Model<OrdersDocument>,
  ) {}

  @Process('process-order')
  async processOrder(job: Job<any>) {
    try {
      await this.timeout(10000);
      this.orderModel.updateOne(
        { orderNumber: job.data.orderNumber },
        { status: 'COMPLETED' },
      );
    } catch (e) {
        throw e
    }
  }

  async timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
