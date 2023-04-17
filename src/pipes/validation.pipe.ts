import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "../exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    console.log('ValidationPipe value:', value)
    if (!metadata.metatype || !value) { return value }
    const obj = plainToInstance(metadata.metatype, value);

    const errors = await validate(obj);
    console.log('errors',errors)

    if(errors.length) {
      const messages = errors.map(err => {
        if (!err.constraints) { return false}
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`
      })
      throw new ValidationException(messages)
    }
    return value;
  }
}
