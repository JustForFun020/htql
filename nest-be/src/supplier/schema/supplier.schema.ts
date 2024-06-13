import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    collection: 'suppliers',
    timestamps: true
})
export class Supplier {
    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    phone: string;

    @Prop()
    email: string;

    @Prop()
    totalPurchase: number;

    @Prop()
    totalPaid: number;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);