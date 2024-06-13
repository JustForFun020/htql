import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        private readonly entityManager: EntityManager
    ) {}

    async findUserByEmail(email: string) {
        const user = await this.entityManager.query(`SELECT * FROM htql.nguoidung WHERE email = '${email}'`);
        const {mat_khau, ...result} = user[0]
        return result
    }
}