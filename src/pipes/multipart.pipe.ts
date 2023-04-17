import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

@Injectable()
export class MultipartPipe implements PipeTransform<any> {
  // constructor(private hz?: any) {
  //   console.log('hz', hz)
  // }

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!metadata.metatype || !value) { return value }
    const obj = plainToInstance(metadata.metatype, value);
    // if (value.type !== 'file') { return value }

    console.log('multipart pipe value:', value)

    return value;
  }
}
