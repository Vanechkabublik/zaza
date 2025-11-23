import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { VideoService } from './video.service';
import {VideoBaseDto} from "./dto/videobase.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {FileService} from "../file.service";

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService, private fileService: FileService) {}

  @Post('veo-3.1-fast')
  @HttpCode(200)
  async generateVeo31Fast(@Body() data: VideoBaseDto) {}

  @Post('veo-3.1')
  @HttpCode(200)
  async generateVeo31(@Body() data: VideoBaseDto) {}

  @Post('veo-3')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async generateVeo3(@Body() data: VideoBaseDto, @UploadedFile() file?: Express.Multer.File) {
    let imageUrl: string | undefined;

    if (file) {
      const photo = await this.fileService.upload(file);
      imageUrl = photo.url;
    }

    return this.videoService.genVeo3(data, imageUrl);
  }

  @Post('veo-3-fast')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async generateVeo3Fast(@Body() data: VideoBaseDto, @UploadedFile() file?: Express.Multer.File) {
    let imageUrl: string | undefined;

    if (file) {
      const photo = await this.fileService.upload(file);
      imageUrl = photo.url;
    }

    return this.videoService.genVeo3Fast(data, imageUrl);
  }

}
