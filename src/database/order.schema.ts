import * as mongoose from 'mongoose'
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type OrdersDocument = Orders & Document;

@Schema({timestamps: true})
export class Orders {
    @Prop({type: Number})
    orderNumber: number

    @Prop({type: Boolean})
    vip: Boolean

    @Prop({type: String})
    status: string
}   

export const OrderSchema = SchemaFactory.createForClass(Orders);