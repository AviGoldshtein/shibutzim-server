import { IsArray, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

const csvToArray = ({ value }: any) => {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }

  return [];
};

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
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string") return value.split(",");
    return [];
  })
  @IsArray()
  unitIds: string[];

  @ApiPropertyOptional({
    description: "Comma-separated service type IDs",
    example: "id1,id2",
  })
  @IsOptional()
  @Transform(csvToArray)
  @IsArray()
  serviceTypeIds?: string[];

  @ApiPropertyOptional({
    description: "Comma-separated resource type IDs",
    example: "id1,id2",
  })
  @IsOptional()
  @Transform(csvToArray)
  @IsArray()
  resourceTypeIds?: string[];

  @ApiPropertyOptional({
    description: "Comma-separated location IDs",
    example: "id1,id2",
  })
  @IsOptional()
  @Transform(csvToArray)
  @IsArray()
  locationIds?: string[];
}