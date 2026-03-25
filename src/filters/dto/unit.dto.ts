import { ApiProperty } from "@nestjs/swagger";

export class UnitDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [UnitDto], required: false })
  children?: UnitDto[];
}