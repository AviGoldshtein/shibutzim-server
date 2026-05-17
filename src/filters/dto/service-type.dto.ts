import { ApiProperty } from '@nestjs/swagger';

export class ServiceTypeDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Training' })
  name: string;
}
