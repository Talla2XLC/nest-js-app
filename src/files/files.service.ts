import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as util from 'util';
import { pipeline } from 'stream'

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {

      // Создаем UUID для названия Изображения
      const fileName = uuid.v4() + '.jpg';

      // Определяем путь
      const filePath = path.resolve(__dirname, '..', 'static');

      // Если папка недоступна, создаем её и все недостающие папки
      if(!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }

      const pump = util.promisify(pipeline)
      await pump(file, fs.createWriteStream(path.join(filePath, fileName)))

      return fileName
    } catch (err) {
      console.log('Ошибка записи файла:', err)
      throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
