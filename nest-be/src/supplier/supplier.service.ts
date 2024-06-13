import { Injectable } from "@nestjs/common";

@Injectable()
export class SupplierService {
    constructor(
    ) {}

    async getAllSuppliers() {
        return 'ok'
    }

    async findSupplierByName(name: string) {
        return 'ok'
    }
}