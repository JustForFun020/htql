import { Body, Controller, Inject, Post } from "@nestjs/common";
import { SearchCatalogDto } from "./dto/search-catalog.dto";
import { CatalogService } from "./catalog.service";
import { Public } from "src/auth/decorator/isPublic.decorator";

@Public()
@Controller("catalog")
export class CatalogController {
    constructor(
        @Inject(CatalogService)
        private readonly catalogService: CatalogService
    ) {}

    @Post('classifications')
    async classificationCatalog(@Body() listCriteria: SearchCatalogDto[]) {
        return await this.catalogService.classificationCatalog(listCriteria);
    }
}