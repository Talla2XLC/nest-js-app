import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
  @ApiProperty({example: 'ADMIN', description: 'Значение Роли пользователя'})
  @IsString({message: 'Должно быть строкой'})
  readonly value: string;

  @ApiProperty({example: '1', description: 'ID Пользователя, которому добавляется роль'})
  @IsNumber({},{message: 'Должно быть числом'})
  readonly userId: number;
}
