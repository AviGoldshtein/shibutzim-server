import { IsArray, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetShibutzimDto {
  @ApiProperty({
    description: "Start date for filtering (ISO format)",
    example: "2026-03-01",
  })
  @IsString()
  from: string;

  @ApiProperty({
    description: "End date for filtering (ISO format)",
    example: "2026-11-25",
  })
  @IsString()
  to: string;

  @ApiProperty({
    description: "Comma-separated unit IDs",
    example: "id1,id2,id3",
  })
  @Transform(({ value }) => value.split(","))
  @IsArray()
  unitIds: string[];

  @ApiPropertyOptional({
    description: "Comma-separated service type IDs",
    example: "id1,id2",
  })
  @IsOptional()
  @Transform(({ value }) => value.split(","))
  @IsArray()
  serviceTypeIds?: string[];

  @ApiPropertyOptional({
    description: "Comma-separated resource type IDs",
    example: "id1,id2",
  })
  @IsOptional()
  @Transform(({ value }) => value.split(","))
  @IsArray()
  resourceTypeIds?: string[];

  @ApiPropertyOptional({
    description: "Comma-separated location IDs",
    example: "id1,id2",
  })
  @IsOptional()
  @Transform(({ value }) => value.split(","))
  @IsArray()
  locationIds?: string[];
}