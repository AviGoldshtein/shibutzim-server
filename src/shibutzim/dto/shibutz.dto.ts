import { ApiProperty } from '@nestjs/swagger';

import { ShibutzResourceDto } from './shibutz-resource.dto';

export class ShibutzDto {
  @ApiProperty({ example: 'b5831de0-b3a2-4598-adf7-2cf91f0a9897' })
  id: string;

  @ApiProperty({ example: 'אימון הקמה' })
  title: string;

  @ApiProperty({ example: 'SHB001' })
  codeShibutz: string;

  @ApiProperty({ example: 'הכשרה' })
  domain: string;

  @ApiProperty({ example: 'אימון הקמה גדודי' })
  mesima: string;

  @ApiProperty({ example: '1000.00' })
  directCost: string;

  @ApiProperty({ example: '500.00' })
  costOfItems: string;

  @ApiProperty({ example: 5 })
  variationPastYear: number;

  @ApiProperty({ example: '2026-03-01' })
  dateBegin: string;

  @ApiProperty({ example: '2026-03-10' })
  dateEnd: string;

  @ApiProperty({ example: 'gdud-tzabar' })
  unitNodeId: string;

  @ApiProperty({ example: 'גולני' })
  location: string;

  @ApiProperty({ example: 'מילואים' })
  serviceType: string;

  @ApiProperty({ type: [ShibutzResourceDto] })
  resources: ShibutzResourceDto[];
}
