interface MultipartFile {
  toBuffer: () => Promise<Buffer>;
  file: NodeJS.ReadableStream;
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  fields: import('@fastify/multipart').MultipartFields;
}

declare module "fastify" {
  interface FastifyRequest {
    body: {
      [key: string]: any
    }
    incomingFile: MultipartFile | undefined;
  }
}
