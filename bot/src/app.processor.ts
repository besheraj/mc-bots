import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor('orders-queue')
export class ProcessOrders{
    constructor(
        
    ) {}

    @Process('process-order')
    async processOrder(job: Job<any>) {
        try{

        } catch (e) {
            
        }
    }
}
