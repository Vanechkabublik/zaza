import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import {FileService} from "../file.service";
import {ReplicateService} from "../replicate.service";

@Module({
  controllers: [ImageController],
  providers: [ImageService, FileService, ReplicateService],
})
export class ImageModule {}
