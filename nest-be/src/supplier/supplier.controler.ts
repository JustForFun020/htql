import { Controller, Get, Param } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { Public } from "src/auth/decorator/isPublic.decorator";

@Public()
@Controller('suppliers')
export class SupplierController {
    constructor(
        private readonly suppliersService: SupplierService
    ) {}

    @Get()
    async getAllSuppliers() {
        return await this.suppliersService.getAllSuppliers();
    }

    @Get('name/:name')
    async findSupplierByName(@Param('name') name: string){
        return await this.suppliersService.findSupplierByName(name);
    }
}