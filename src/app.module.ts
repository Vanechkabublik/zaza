import { Module } from '@nestjs/common';
import { UpscaleModule } from './upscale/upscale.module';
import {ConfigModule} from "@nestjs/config";
import { ResultModule } from './result/result.module';
import { PromptModule } from './prompt/prompt.module';
import { AudioModule } from './audio/audio.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      UpscaleModule,
      ResultModule,
      PromptModule,
      AudioModule,
      VideoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
