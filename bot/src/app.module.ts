import { Module } from '@nestjs/common';
import { MongoCollectionModule } from './database/collections.modules';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { ProcessOrders } from './app.processor';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@mongo:27017/'),
    MongoCollectionModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
      prefix: 'orders',
    }),
    BullModule.registerQueue(
      {name: "orders-queue"}
    ),

  ],
  providers: [ProcessOrders],
})
export class AppModule {}
