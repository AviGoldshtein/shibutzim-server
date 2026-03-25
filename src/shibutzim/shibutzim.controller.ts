import { Controller, Get, Query } from "@nestjs/common";
import { ShibutzimService } from "./shibutzim.service";
import { GetShibutzimDto } from "./dto/get-shibutzim.dto";
import { ApiTags, ApiOperation, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { ShibutzDto } from "./dto/shibutz.dto";
import { SHIBUTZ_EXAMPLE } from "./examples/shibutz.example";

@ApiTags("Shibutzim")
@Controller("shibutzim")
export class ShibutzimController {
  constructor(private readonly shibutzimService: ShibutzimService) {}

  @Get()
  @ApiOperation({
    summary: "Get shibutzim with filters",
    description:
      "Returns shibutzim filtered by date range and optional filters like units, service types, resource types, and locations",
  })
  @ApiResponse({
    status: 200,
    description: "Filtered list of shibutzim",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: { $ref: getSchemaPath(ShibutzDto) },
        },
        examples: {
          example1: {
            summary: "Real example",
            value: SHIBUTZ_EXAMPLE,
          },
        },
      },
    },
  })
  getShibutzim(@Query() query: GetShibutzimDto) {
    return this.shibutzimService.getShibutzim(query);
  }
}