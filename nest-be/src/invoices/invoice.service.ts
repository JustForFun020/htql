import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";

@Injectable()
export class InvoiceService {
    constructor(
        private readonly entityManager: EntityManager
    ) {}

    async findAll() {
        return await this.entityManager.query("SELECT * FROM htql.hoadon")
    }

    async findOne(id: string) {
        return `Invoice with id ${id}`;
    }

    async updateInvoice(id: string, status: number) {
        return await this.entityManager.query(`UPDATE htql.hoadon SET trang_thai = ${status} WHERE id = ${id}`);
    }
}