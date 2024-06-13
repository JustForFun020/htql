import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MysqlService } from "./mysql.service";
import { IProduct } from "utils/interface/products";
import { ImportProductDto } from "./dto/import-product.dto";
import { Public } from "src/auth/decorator/isPublic.decorator";

@Public()
@Controller('mysql')
export class MysqlController {
    constructor(
        private readonly mysqlService: MysqlService
    ) {}

    @Get()
    async getAllProductsForClient() {
        return this.mysqlService.getProduct();
    }

    @Post()
    async createManyProduct(@Body() products: IProduct[]) {
        return this.mysqlService.createManyProduct(products);
    }

    @Get('find-product-by-name/:name')
    async findProductByName(@Param('name') name: string) {
        return this.mysqlService.findProductByName(name);
    }

    @Post('import-product')
    async importProduct(@Body() importProduct: ImportProductDto) {
        return this.mysqlService.handleProductWhenImportGoods(importProduct)
    }

}