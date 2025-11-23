import { BadRequestException, Body, Controller, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpscaleService } from './upscale.service';
import { FileService } from "../file.service";
import { CreateUpscaleDto } from './dto/create-upscale.dto';

@Controller('upscale')
export class UpscaleController {
  constructor(
      private readonly upscaleService: UpscaleService,
      private fileService: FileService
  ) {}

  @Post()
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
      @Body() data: CreateUpscaleDto,
      @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) throw new BadRequestException('File required');
    const photo = await this.fileService.upload(file);
    return this.upscaleService.upscale(
        photo.url,
        data.upscale_factor,
        data.compression_quality
    );
  }
}