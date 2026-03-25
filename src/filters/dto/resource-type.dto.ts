import { ApiProperty } from "@nestjs/swagger";

export class ResourceTypeDto {
  @ApiProperty({ example: "uuid" })
  id: string;

  @ApiProperty({ example: "Vehicle" })
  name: string;
}