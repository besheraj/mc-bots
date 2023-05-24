import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoCollectionModule } from './database/collections.modules';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@mongo:27017/'),
    MongoCollectionModule,
    BullModule.forRoot({
      redis: {
        host: '',
        port: 6379,
      },
      prefix: 'orders',
    }),
    BullModule.registerQueue(
      {name: "orders-queue"}
    ),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
