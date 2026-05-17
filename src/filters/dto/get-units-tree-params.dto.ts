import { ApiProperty } from '@nestjs/swagger';

export class GetUnitsTreeParamsDto {
  @ApiProperty({
    description: 'Soldier ID',
    example: 's12345',
  })
  idSoldier: string;
}
