import { Injectable } from "@nestjs/common";
import { UpdateProductDto } from "./dto/update-product.dto";
import { EntityManager } from 'typeorm';


@Injectable()
export class ProductService {
    constructor(
        private readonly entityManager: EntityManager
    ) {}

    async getAllProducts() {
        const allProducts = await this.entityManager.query('SELECT * FROM htql.sanpham');
        return allProducts.map(product => {
            return {
                key: product.id.toString(),
                name: product.ten_san_pham,
                amount: product.so_luong,
                price: product.gia_ban,
                description: product.mo_ta,
                image: product.img_hero,
                createdAt: "",
                updatedAt: ""
            }
        });
    }

    async findProductById(id: string) {
        const product = await this.entityManager.query(`SELECT * FROM htql.sanpham WHERE id = ${id}`);
        return {
            key: product[0]?.id.toString() ?? "0",
            name: product[0].ten_san_pham,
            amount: product[0].so_luong,
            price: product[0].gia_ban,
            description: product[0].mo_ta,
            image: product[0].img_hero,
            createdAt: "", 
            updatedAt: ""
        };
    }

    async deleteProductById(id: string) {
        return await this.entityManager.query(`DELETE FROM htql.sanpham WHERE id = ${id}`);
    }

    async updateProductById(id: string, updateProductDto: UpdateProductDto) {
        return await this.entityManager.query(`UPDATE htql.sanpham SET ten_san_pham = '${updateProductDto.name}', gia_ban = ${updateProductDto.price}, mo_ta = '${updateProductDto.description}' WHERE id = ${id}`);
    }

    async findManyProductByName(name: string) {
        const products = await this.entityManager.query(`SELECT * FROM htql.sanpham WHERE ten_san_pham LIKE '%${name}%'`);
        return products.map(product => {
            return {
                key: product.id.toString(),
                name: product.ten_san_pham,
                amount: product.so_luong,
                price: product.gia_ban,
                description: product.mo_ta,
                image: product.img_hero,
                createdAt: "",
                updatedAt: ""
            }
        });
    }

    async getProduct() {
        return await this.entityManager.query('SELECT * FROM htql.sanpham');
    }

    async getProductByCatalog(cid: number) {
        return await this.entityManager.query(`SELECT * FROM htql.sanpham WHERE danhmucsp_id = ${cid}`);
    }

    async updateProductAmount(pid: number, data: any) {
        const { amount, did } = data;
        await this.entityManager.query(`UPDATE htql.sanpham SET so_luong = ${amount} WHERE id = ${pid}`);
        return await this.entityManager.query(`UPDATE htql.danhmucsanpham d SET so_luong = (SELECT SUM(so_luong) FROM htql.sanpham s WHERE s.danhmucsp_id = ${did}) WHERE d.id = ${did}`)
    }
}