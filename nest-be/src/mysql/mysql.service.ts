import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { IProduct } from "utils/interface/products";
import { ImportProductDto } from "./dto/import-product.dto";

@Injectable()
export class MysqlService {
    constructor(
        private readonly entityManager: EntityManager) {}

    async getProduct() {
        try {
            return await this.entityManager.query('SELECT * FROM sanpham');
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async createManyProduct(products: IProduct[]) {
        try {
            const productData = products.map(product => [
                product.price, 
                product.image, 
                product.description, 
                product.updatedAt ? this.formatDate(product.updatedAt) : null, 
                product.createdAt ? this.formatDate(product.createdAt) : null, 
                product.amount, 
                product.name
            ]);

            const existingProducts = await this.entityManager.query('SELECT ten_san_pham FROM htql.sanpham');
            const existingProductNames = existingProducts.map((product: any) => product.ten_san_pham);
            const result = productData.filter((product: any) => !existingProductNames.includes(product[6]));

            if(result.length === 0) return false
            
    
            await this.entityManager.query(
                'INSERT INTO htql.sanpham (gia_ban, img_hero, mo_ta, ngay_cap_nhat, ngay_tao, so_luong, ten_san_pham) VALUES ?', 
                [result]
            );
            return true;
        } catch (error) {
            console.error('Error creating products:', error);
            throw error;
        }
    }

    private formatDate(date: string): string {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    }

    async findProductByName(name: string) {
        try {
            return await this.entityManager.query(`SELECT id FROM htql.sanpham WHERE ten_san_pham LIKE '%${name}%'`);
        } catch (error) {
            console.error('Error finding products:', error);
            throw error;
        }
    }

    async handleProductWhenImportGoods(importProduct: ImportProductDto) {
        const {price, productName, amount} = importProduct;
        try {
            const product = await this.entityManager.query(`SELECT * FROM htql.sanpham WHERE ten_san_pham = '${productName}'`);
            // if product not found, add it to the database
            if(product.length === 0) {
                await this.entityManager.query(
                    `INSERT INTO htql.sanpham (gia_ban, img_hero, mo_ta, ngay_cap_nhat, ngay_tao, so_luong, ten_san_pham) VALUES (${price}, 'https://via.placeholder.com/150', 'No description', CURDATE(), ${amount}, '${productName}')`
                );
                return;
            }
            // else update the amount of the product
            await this.entityManager.query(`UPDATE htql.sanpham SET so_luong = so_luong + ${amount} WHERE ten_san_pham = '${productName}'`);


        } catch (error) {
            console.error('Error checking product info:', error);
            throw error;
        }
    }
}