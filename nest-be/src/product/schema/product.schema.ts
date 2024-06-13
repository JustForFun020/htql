import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Product {
    @Prop()
    index: number

    @Prop()
    yearOfPublication: number;
    
    @Prop()
    name: string;
    
    @Prop()
    author: string;
    
    @Prop()
    authorRating: string;

    @Prop()
    languageCode: string;

    @Prop()
    bookAverageRating: number;

    @Prop()
    bookRatingsCount: string;

    @Prop()
    genre: string;

    @Prop()
    grossSales: number
    
    @Prop()
    publisherRevenue: number

    @Prop()
    price: number

    @Prop()
    salesRank: number

    @Prop()
    publisher: string

    @Prop()
    unitsSold: number

    @Prop()
    amount: number
}

export const ProductSchema = SchemaFactory.createForClass(Product);
