import { Body, Controller, Post, Req, Res, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.service";
import fastify = require('fastify');
import { ImageUploadGuard } from "../files/image-upload.guard";
import { File } from "../files/file.decorator";
import { MultipartPipe } from "../pipes/multipart.pipe";
import { MultipartInterceptor } from "../interceptors/multipart-interceptor";

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {
  }

  @Post()
  // @UseGuards(ImageUploadGuard)
  @UseInterceptors(MultipartInterceptor)
  @UsePipes(MultipartPipe)
  createPost(
    @Body() dto: CreatePostDto,
    @File() image: MultipartFile,
  ): Promise<any> {
    return this.postService.create(
      dto,
      image
    )
  }
}
