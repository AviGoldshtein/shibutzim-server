import { IsArray, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class GetShibutzimDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @Transform(({ value }) => value.split(","))
  @IsArray()
  unitIds: string[];

  @IsOptional()
  @Transform(({ value }) => value.split(","))
  @IsArray()
  serviceTypeIds?: string[];

  @IsOptional()
  @Transform(({ value }) => value.split(","))
  @IsArray()
  resourceTypeIds?: string[];

  @IsOptional()
  @Transform(({ value }) => value.split(","))
  @IsArray()
  locationIds?: string[];
}