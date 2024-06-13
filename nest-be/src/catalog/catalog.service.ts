import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { SearchCatalogDto } from "./dto/search-catalog.dto";

@Injectable()
export class CatalogService {
    constructor(
        private readonly entityManager: EntityManager
    ) {}

    async classificationCatalog(listCriteria: SearchCatalogDto[]) {
        const catalogCriteria = listCriteria[0].name === 'Limited product' ? 1
        : listCriteria[0].name === 'Mass published products' ? 3
        : listCriteria[0].name === 'Exclusive in store' ? 2
        : '';
        const priceCriteria = listCriteria[1].name === '0 - 5$' ? [0, 5]
        : listCriteria[1].name === '5$ - 12$' ? [5, 12] 
        : listCriteria[1].name === 'Higher than 12$' ? [12, 10000] 
        : [0, 10000];
        const amountCriteria = listCriteria[2].name === 'Lower than 20' ? [0, 20] 
        : listCriteria[2].name === '20 - 50' ? [20,50] 
        : listCriteria[2].name === 'Higher than 50' ? [50, 10000] 
        : [0, 10000];
        let products = [];
        if(catalogCriteria !== '') {
            products = await this.entityManager.query(`
                SELECT * FROM htql.sanpham WHERE danhmucsp_id = '${catalogCriteria}' AND gia_ban BETWEEN ${priceCriteria[0]} AND ${priceCriteria[1]} AND so_luong BETWEEN ${amountCriteria[0]} AND ${amountCriteria[1]}
            `);
        } else {
            products = await this.entityManager.query(`
                SELECT * FROM htql.sanpham WHERE gia_ban BETWEEN ${priceCriteria[0]} AND ${priceCriteria[1]} AND so_luong BETWEEN ${amountCriteria[0]} AND ${amountCriteria[1]}
            `);
        }
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
}