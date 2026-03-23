import { Controller, Get } from "@nestjs/common";
import { FiltersService } from "./filters.service";

@Controller("filters")
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get("units-tree")
  getUnitsTree() {
    return this.filtersService.getUnitsTree();
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