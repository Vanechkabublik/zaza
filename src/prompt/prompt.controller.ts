import {BadRequestException, Body, Controller, HttpCode, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { PromptService } from './prompt.service';
import {FileService} from "../file.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {PromptDto} from "./dto/prompt.dto";

@Controller('prompt')
export class PromptController {
  constructor(
      private readonly promptService: PromptService,
      private fileService: FileService
  ) {}

  @Post('/surprise')
  @HttpCode(200)
  async surprisePrompt() {
    return this.promptService.surprise();
  }

  @Post('/improve')
  @HttpCode(200)
  async improvePrompt(@Body() data: PromptDto) {
    return this.promptService.improve(data);
  }
}
