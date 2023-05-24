import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllOrders() {
    return this.appService.getOrders();
  }

  @Post()
  async createOrder(
    @Body() body
  ) {
    return this.appService.createOrder(body);
  }
}
