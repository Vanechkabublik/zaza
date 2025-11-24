import {Body, Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AudioService } from './audio.service';
import {PromptDto} from "../prompt/dto/prompt.dto";
import {SpeechDto} from "./dto/speech.dto";
import {GenDto} from "./dto/gen.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post('speech')
  @HttpCode(200)
  async speech(@Body() data: SpeechDto) {
    return this.audioService.speech(data)
  }

  @Post('generate')
  @HttpCode(200)
  async generate(@Body() data: GenDto) {
    return this.audioService.generateMusic(data)
  }

  @Get('models')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить список доступных голосов для озвучки текста',
    description: 'Возвращает список всех доступных голосов для генерации озвучки с их идентификаторами и характеристиками'
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный запрос, возвращает список моделей',
    schema: {
      example: [
        {
          "id": "af_alloy",
          "name": "Alloy",
          "gender": "female"
        },
        {
          "id": "af_aoede",
          "name": "Aoede",
          "gender": "female"
        }
      ]
    }
  })
  async getModels() {
    return [
      {
        "id": "af_alloy",
        "name": "Alloy",
        "gender": "female"
      },
      {
        "id": "af_aoede",
        "name": "Aoede",
        "gender": "female"
      },
      {
        "id": "af_bella",
        "name": "Bella",
        "gender": "female"
      },
      {
        "id": "af_jessica",
        "name": "Jessica",
        "gender": "female"
      },
      {
        "id": "af_kore",
        "name": "Kore",
        "gender": "female"
      },
      {
        "id": "af_nicole",
        "name": "Nicole",
        "gender": "female"
      },
      {
        "id": "af_nova",
        "name": "Nova",
        "gender": "female"
      },
      {
        "id": "af_river",
        "name": "River",
        "gender": "female"
      },
      {
        "id": "af_sarah",
        "name": "Sarah",
        "gender": "female"
      },
      {
        "id": "af_sky",
        "name": "Sky",
        "gender": "female"
      },
      {
        "id": "am_adam",
        "name": "Adam",
        "gender": "male"
      },
      {
        "id": "am_echo",
        "name": "Echo",
        "gender": "male"
      },
      {
        "id": "am_eric",
        "name": "Eric",
        "gender": "male"
      },
      {
        "id": "am_fenrir",
        "name": "Fenrir",
        "gender": "male"
      },
      {
        "id": "am_liam",
        "name": "Liam",
        "gender": "male"
      },
      {
        "id": "am_michael",
        "name": "Michael",
        "gender": "male"
      },
      {
        "id": "am_onyx",
        "name": "Onyx",
        "gender": "male"
      },
      {
        "id": "am_puck",
        "name": "Puck",
        "gender": "male"
      }
    ]
  }
}
