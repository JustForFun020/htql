import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { Public } from "src/auth/decorator/isPublic.decorator";
import { InvoiceService } from "./invoice.service";

@Public()
@Controller("invoices")
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}
    
    @Get()
    async getAllInvoices() {
        return await this.invoiceService.findAll();
    }
    
    @Get(":id")
    async getInvoiceById(@Param("id") id: string) {
        return await this.invoiceService.findOne(id);
    }

    @Patch(":id")
    async updateInvoice(@Param("id") id: string, @Body("status") status: number) {
        return await this.invoiceService.updateInvoice(id, status);
    }
}