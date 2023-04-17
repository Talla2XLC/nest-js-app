import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
  @ApiProperty({example: '1', description: 'ID заблокированного Пользователя'})
  readonly userId: number;

  @ApiProperty({example: 'Ругался матом', description: 'Причина блокировки пользователя'})
  readonly banReason: string;
}
