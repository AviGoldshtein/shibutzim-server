import { Controller, Get } from '@nestjs/common';

import { DashboardService } from './dashboard.service';

// TODO: Implement actual logic for these endpoints, currently they return mock data from the service.
// TODO: Add Swagger documentation for these endpoints once the actual logic is implemented.

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('quantity-and-cost')
  getQuantityAndCost() {
    return this.dashboardService.getQuantityAndCost();
  }

  @Get('resources')
  getResources() {
    return this.dashboardService.getResources();
  }

  @Get('reports')
  getReports() {
    return this.dashboardService.getReports();
  }
}
