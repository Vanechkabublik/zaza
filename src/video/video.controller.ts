import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFile, UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { VideoService } from './video.service';
import {VideoBaseDto} from "./dto/videobase.dto";
import {FileFieldsInterceptor, FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {FileService} from "../file.service";
import {SoraDto} from "./dto/Sora.dto";

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService, private fileService: FileService) {}

  @Post('veo-3.1-fast')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'file', maxCount: 1 },
    { name: 'last_frame', maxCount: 1 }
  ]))
  @HttpCode(200)
  async generateVeo31Fast(
   @UploadedFiles() files: {
    file?: Express.Multer.File[],
    last_frame?: Express.Multer.File[]
  }, @Body() data: VideoBaseDto) {
    let imageUrl: string | undefined;
    let lastFrameUrl: string | undefined;

    if (files) {
      if(files.file && files.file[0]) {
        const photo = await this.fileService.upload(files.file[0]);
        imageUrl = photo.url;
      }
      if(files.last_frame && files.last_frame[0]) {
        const photo = await this.fileService.upload(files.last_frame[0]);
        lastFrameUrl = photo.url;
      }
    }

    return this.videoService.genveo31Fast(data, imageUrl, lastFrameUrl);
  }

  @Post('veo-3.1')
  @UseInterceptors(FilesInterceptor('files', 10))
  @HttpCode(200)
  async generateVeo31(@UploadedFiles() files: Express.Multer.File[], @Body() data: VideoBaseDto) {
    if (files && files.length > 0) {
      const results = await this.fileService.uploadMultiple(files);
      const imageUrls = results.map(file => file.url);

      return this.videoService.genveo31(data, imageUrls);
    }
    return this.videoService.genveo31(data);
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

  @Post('veo-3')
  @HttpCode(200)
  async generateVeo3() {
    return {
      success: false,
      message: 'This is Veo-3 server not work!'
    }
  }

  @Post('sora-2-pro')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  async sora2pro(@Body() data: SoraDto, @UploadedFile() file?: Express.Multer.File) {
    let imageUrl: string | undefined;

    if (file) {
      const photo = await this.fileService.upload(file);
      imageUrl = photo.url;
    }

    return this.videoService.genvideosora2(data, imageUrl);
  }

}
