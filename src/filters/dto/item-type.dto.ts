import { ApiProperty } from '@nestjs/swagger';

export class ItemTypeDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Weapon' })
  name: string;
}
