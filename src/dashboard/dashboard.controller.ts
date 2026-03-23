import { Controller, Get } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("quantity-and-cost")
  getQuantityAndCost() {
    return this.dashboardService.getQuantityAndCost();
  }

  @Get("resources")
  getResources() {
    return this.dashboardService.getResources();
  }

  @Get("reports")
  getReports() {
    return this.dashboardService.getReports();
  }
}