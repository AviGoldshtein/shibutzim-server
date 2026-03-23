import { Injectable } from "@nestjs/common";
import quantityAndCost from "../mock_responses/quantity-and-cost.json";
import resources from "../mock_responses/resources.json";
import reports from "../mock_responses/reports.json";

@Injectable()
export class DashboardService {
  getQuantityAndCost() {
    return quantityAndCost;
  }

  getResources() {
    return resources;
  }

  getReports() {
    return reports;
  }
}