import { Module } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { PromptController } from './prompt.controller';
import {FileService} from "../file.service";
import {ReplicateService} from "../replicate.service";

@Module({
  controllers: [PromptController],
  providers: [PromptService, FileService, ReplicateService],
})
export class PromptModule {}
