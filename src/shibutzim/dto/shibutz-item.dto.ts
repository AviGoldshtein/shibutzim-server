import { ApiProperty } from '@nestjs/swagger';

export class ShibutzItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 100 })
  quantity: number;

  @ApiProperty({ example: '120.00' })
  unitCost: string;

  @ApiProperty({ example: 'אפודים' })
  itemType: string;
}
