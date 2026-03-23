import { Controller, Get, Query } from "@nestjs/common";
import { ShibutzimService } from "./shibutzim.service";
import { GetShibutzimDto } from "./dto/get-shibutzim.dto";

@Controller("shibutzim")
export class ShibutzimController {
  constructor(private readonly shibutzimService: ShibutzimService) {}

  @Get()
  getShibutzim(@Query() query: GetShibutzimDto) {
    return this.shibutzimService.getShibutzim(query);
  }
}