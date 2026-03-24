import { IsString } from "class-validator";

export class getUnitsTreeDto {
  @IsString()
  idSoldier: string;
}