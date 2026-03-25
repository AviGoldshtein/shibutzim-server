import { ApiProperty } from "@nestjs/swagger";

export class LocationDto {
  @ApiProperty({ example: "uuid" })
  id: string;

  @ApiProperty({ example: "Bahad 1" })
  name: string;

  @ApiProperty({ example: "Training Base", required: false })
  baseType?: string;

  @ApiProperty({ example: "South", required: false })
  region?: string;
}