import { Module } from '@nestjs/common';
import { UpscaleService } from './upscale.service';
import { UpscaleController } from './upscale.controller';
import {FileService} from "../file.service";
import {ReplicateService} from "../replicate.service";

@Module({
  controllers: [UpscaleController],
  providers: [UpscaleService, FileService, ReplicateService],
})
export class UpscaleModule {}
