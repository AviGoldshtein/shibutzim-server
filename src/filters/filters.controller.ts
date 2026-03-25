import { Controller, Get, Param } from "@nestjs/common";
import { FiltersService } from "./filters.service";

@Controller("filters")
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get("units-tree/:idSoldier")
  getUnitsTree(@Param("idSoldier") idSoldier: string) {
    return this.filtersService.getUnitsTree(idSoldier);
  }

  @Get("service-types")
  getServiceTypes() {
    return this.filtersService.getServiceTypes();
  }

  @Get("resource-types")
  getResourceTypes() {
    return this.filtersService.getResourceTypes();
  }

  @Get("item-types")
  getItemTypes() {
    return this.filtersService.getItemTypes();
  }

  @Get("locations")
  getLocations() {
    return this.filtersService.getLocations();
  }
}