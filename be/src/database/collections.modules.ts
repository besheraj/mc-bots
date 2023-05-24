import { Mongoose } from "mongoose";
import { OrderSchema, Orders } from "./order.schema";
import { Global, Module}  from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";

const models = [{model: Orders, schema: OrderSchema, collection: "orders"}];

const modelProvider = models.map (item => {
    return MongooseModule.forFeature([
        {name: item.model.name, schema: item.schema}
    ])
});

@Global()
@Module({
    imports: [...modelProvider],
    exports: [...modelProvider],
})

export class MongoCollectionModule {};