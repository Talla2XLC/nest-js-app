import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { FilesService } from "../files/files.service";
import fastify = require('fastify');
import * as util from 'util';
import * as fs from 'fs';
import stream = require('stream');

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService
  ) {}

  async create(dto: CreatePostDto, image: any): Promise<Post | string> {
    const payload = {
      ...dto,
      image: ''
    }
    if(image) {
      const fileName = await this.fileService.createFile(image);
      payload.image = fileName;
    }
    const post = await this.postRepository.create(payload);
    return post;
  }
}
