import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import {ReplicateService} from "../replicate.service";
import {FileService} from "../file.service";

@Module({
  controllers: [VideoController],
  providers: [VideoService, ReplicateService, FileService],
})
export class VideoModule {}
