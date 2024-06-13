import { Controller, Get, Inject, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { Public } from "src/auth/decorator/isPublic.decorator";

@Public()
@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService
    ) {}

    @Get('find-user-by-email/:email')
    async findUserByEmail(@Param('email') email: string) {
        return this.userService.findUserByEmail(email)
    }
}