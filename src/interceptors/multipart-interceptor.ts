import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from "@nestjs/common";
import { Observable } from "rxjs";
import { FastifyRequest } from "fastify";

export type MultipartInterceptorResponse = {
  [key: string]: any
  isMultipart: boolean
}

@Injectable()
export class MultipartInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest() as FastifyRequest;
    const isMultipart = req.isMultipart();

    if (!isMultipart) {
      throw new BadRequestException("multipart/form-data expected.");
    }

    req.body = await this.parseMultipart(req);

    return next.handle().pipe();
  }

  async parseMultipart(req: FastifyRequest): Promise<{[key: string]: any}> {
    return new Promise((resolve, reject) => {
      const parsedRes: {[key: string]: any} = {}
      const mp = req.multipart(
        () => { return },
        () => {
          return resolve(parsedRes);
      });
      // for key value pairs in request
      mp.on('field', (key: string, value: any) => {
        if (key === 'userId') {
          parsedRes[key] = Number(value);
        } else {
          parsedRes[key] = value;
        }
        return;
      });
      mp.on('file', (key: string, value: any) => {
        req.incomingFile = value;
        return resolve(parsedRes);
      })
      mp.on('finish', () => {
        return resolve(parsedRes);
      });
    })
  }
}
