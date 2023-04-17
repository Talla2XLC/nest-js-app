import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePostDto {
  @ApiProperty({example: 'Важное объявление', description: 'Заголовок Поста'})
  @IsString({message: 'Должно быть строкой'})
  readonly title: string;

  @ApiProperty({example: 'Жили были...', description: 'Содержание Поста'})
  @IsString({message: 'Должно быть строкой'})
  readonly content: string;

  @ApiProperty({type: Number, description: 'ID пользователя, которому принадлежит Пост'})
  @IsNumber({},{message: 'Должно быть числом'})
  readonly userId: number;

  @ApiProperty({description: 'Изображение Поста'})
  readonly image: MultipartFile;
}
