import {Body, Controller, Get, HttpCode, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { ImageService } from './image.service';
import {FileService} from "../file.service";
import {Imagen4UltraDto} from "./dto/imagen-4-ultra.dto";
import {NanobananoDto} from "./dto/nanobanano.dto";
import {FilesInterceptor} from "@nestjs/platform-express";

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService, private fileService: FileService) {}

  @Post('imagen-4-ultra')
  @HttpCode(200)
  async genImagenUltra(@Body() data: Imagen4UltraDto) {
    return this.imageService.genimagen4ultra(data);
  }

  @Post('imagen-4-fast')
  @HttpCode(200)
  async genImagenFast(@Body() data: Imagen4UltraDto) {
    return this.imageService.genimagen4fast(data);
  }

  @Post('nano-banana')
  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[], @Body() data: NanobananoDto) {
    if (files && files.length > 0) {
      const results = await this.fileService.uploadMultiple(files);
      const imageUrls = results.map(file => file.url);

      return this.imageService.gennanobanano(data, imageUrls);
    }
    return this.imageService.gennanobanano(data);
  }

  @Post('gemini-2.5-flash-image')
  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultipleGemini(@UploadedFiles() files: Express.Multer.File[], @Body() data: NanobananoDto) {
    if (files && files.length > 0) {
      const results = await this.fileService.uploadMultiple(files);
      const imageUrls = results.map(file => file.url);

      return this.imageService.gengemini(data, imageUrls);
    }
    return this.imageService.gengemini(data);
  }
}
