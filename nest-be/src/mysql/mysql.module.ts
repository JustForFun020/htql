import { Module } from "@nestjs/common";
import { MysqlController } from "./mysql.controller";
import { MysqlService } from "./mysql.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "src/product/schema/product.schema";
import { Supplier, SupplierSchema } from "src/supplier/schema/supplier.schema";

@Module({
    // imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}, {name: Supplier.name, schema: SupplierSchema}])],
    providers: [MysqlService],
    exports: [],
    controllers: [MysqlController]
})
export class MysqlModule {}