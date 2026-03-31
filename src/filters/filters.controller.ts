import { Controller, Get, Param } from "@nestjs/common";
import { FiltersService } from "./filters.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { GetUnitsTreeParamsDto } from "./dto/get-units-tree-params.dto";
import { UnitDto } from "./dto/unit.dto";
import { ServiceTypeDto } from "./dto/service-type.dto";
import { ResourceTypeDto } from "./dto/resource-type.dto";
import { ItemTypeDto } from "./dto/item-type.dto";
import { LocationDto } from "./dto/location.dto";
import { ForceTypeDto } from "./dto/force-type.dto";

@ApiTags("Filters")
@Controller("filters")
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get("units-tree/:idSoldier")
  @ApiOperation({ summary: "Get hierarchical units tree for a specific soldier" })
  @ApiResponse({
    status: 200,
    description: "Units tree returned successfully",
    type: [UnitDto],
  })
  getUnitsTree(@Param() params: GetUnitsTreeParamsDto) {
    return this.filtersService.getUnitsTree(params.idSoldier);
  }

  @Get("service-types")
  @ApiOperation({ summary: "Get all available service types" })
  @ApiResponse({
    status: 200,
    description: "List of service types",
    type: [ServiceTypeDto],
  })
  getServiceTypes() {
    return this.filtersService.getServiceTypes();
  }

  @Get("resource-types")
  @ApiOperation({ summary: "Get all available resource types" })
  @ApiResponse({
    status: 200,
    description: "List of resource types",
    type: [ResourceTypeDto],
  })
  getResourceTypes() {
    return this.filtersService.getResourceTypes();
  }

  @Get("item-types")
  @ApiOperation({ summary: "Get all available item types" })
  @ApiResponse({
    status: 200,
    description: "List of item types",
    type: [ItemTypeDto],
  })
  getItemTypes() {
    return this.filtersService.getItemTypes();
  }

  @Get("locations")
  @ApiOperation({ summary: "Get all available locations" })
  @ApiResponse({
    status: 200,
    description: "List of locations",
    type: [LocationDto],
  })
  getLocations() {
    return this.filtersService.getLocations();
  }

  @Get("forces")
  @ApiOperation({ summary: "Get all available forces" })
  @ApiResponse({
    status: 200,
    description: "List of forces",
    type: [ForceTypeDto],
  })
  getForces() {
    return this.filtersService.getForces();
  }
}