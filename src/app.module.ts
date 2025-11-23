import { Module } from '@nestjs/common';
import { UpscaleModule } from './upscale/upscale.module';
import {ConfigModule} from "@nestjs/config";
import { ResultModule } from './result/result.module';
import { PromptModule } from './prompt/prompt.module';
import { AudioModule } from './audio/audio.module';
import { VideoModule } from './video/video.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      UpscaleModule,
      ResultModule,
      PromptModule,
      AudioModule,
      VideoModule,
      ImageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
