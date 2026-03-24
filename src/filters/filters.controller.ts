import { Controller, Get, Query } from "@nestjs/common";
import { FiltersService } from "./filters.service";
import { getUnitsTreeDto } from "./dto/getUnitsTreeDto";

@Controller("filters")
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get("units-tree")
  getUnitsTree(@Query() dto: getUnitsTreeDto) {
    return this.filtersService.getUnitsTree(dto.idSoldier);
  }

  @Get("service-types")
  getServiceTypes() {
    return this.filtersService.getServiceTypes();
  }

  @Get("resource-types")
  getResourceTypes() {
    return this.filtersService.getResourceTypes();
  }
}