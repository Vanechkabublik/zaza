import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import {ReplicateService} from "../replicate.service";

@Module({
  controllers: [AudioController],
  providers: [AudioService, ReplicateService],
})
export class AudioModule {}
