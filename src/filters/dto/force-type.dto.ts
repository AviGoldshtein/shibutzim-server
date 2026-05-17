import { ApiProperty } from '@nestjs/swagger';

export class ForceTypeDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'חיר' })
  name: string;
}
