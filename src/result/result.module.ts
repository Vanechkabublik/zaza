import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import {ReplicateService} from "../replicate.service";

@Module({
  controllers: [ResultController],
  providers: [ResultService, ReplicateService],
})
export class ResultModule {}
