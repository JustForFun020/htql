import { Body, Controller, Delete, Get, HttpException, Param, Patch } from "@nestjs/common";
import { ProductService } from "./product.service";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Public } from "src/auth/decorator/isPublic.decorator";

@Public()
@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @Get()
    async getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    async findProductById(@Param('id') id: string) {
        return this.productService.findProductById(id);
    }

    @Patch('update/:id')
    async updateProductById(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.updateProductById(id, updateProductDto);
    }

    @Delete('delete/:id')
    async deleteProductById(@Param('id') id: string) {
        return this.productService.deleteProductById(id);
    }

    @Get('search/:name')
    async findManyProductByName(@Param('name') name: string) {
        return this.productService.findManyProductByName(name);
    }

    @Get('mysql')
    async getAllProductsForClient() {
        return this.productService.getProduct();
    }

    @Get('by-catalog/:cid')
    async getProductsByCatalog(@Param('cid') cid: number) {
        return this.productService.getProductByCatalog(cid);
    }

    @Patch('update-amount/:pid')
    async updateProductAmount(@Param('pid') pid: number, @Body() data: any) {
        return this.productService.updateProductAmount(pid, data);
    }   
}