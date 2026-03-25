import { ApiProperty } from "@nestjs/swagger";
import { ShibutzItemDto } from "./shibutz-item.dto";

export class ShibutzResourceDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: "ציוד אישי" })
  resourceType: string;

  @ApiProperty({ type: [ShibutzItemDto] })
  items: ShibutzItemDto[];
}