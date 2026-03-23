import { Injectable } from "@nestjs/common";

@Injectable()
export class FiltersService {
  getUnitsTree() {
    return []; // TODO
  }

  getServiceTypes() {
    return ["Type A", "Type B"];
  }

  getResourceTypes() {
    return ["Fuel", "Food", "Equipment"];
  }
}