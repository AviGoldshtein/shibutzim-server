import { ApiProperty } from "@nestjs/swagger";
import { ShibutzResourceDto } from "./shibutz-resource.dto";

export class ShibutzDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  codeShibutz: string;

  @ApiProperty()
  mesima: string;

  @ApiProperty()
  directCost: string;

  @ApiProperty()
  costOfItems: string;

  @ApiProperty({ example: 5 })
  variationPastYear: number;

  @ApiProperty()
  dateBegin: string;

  @ApiProperty()
  dateEnd: string;

  @ApiProperty()
  unitNodeId: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  serviceType: string;

  @ApiProperty({ type: [ShibutzResourceDto] })
  resources: ShibutzResourceDto[];
}