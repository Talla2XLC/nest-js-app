import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({example: 'ADMIN', description: 'Значение Роли пользователя'})
  readonly value: string;

  @ApiProperty({example: 'Администратор', description: 'Описание Роли пользователя'})
  readonly description: string;
}
