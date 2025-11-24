import {Controller, Get, HttpCode, NotFoundException, Param} from '@nestjs/common';
import { ResultService } from './result.service';
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить результат генерации по ID',
    description: 'Возвращает статус и результат генерации по идентификатору prediction'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID prediction из Replicate API',
    example: 'abc123def456'
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный запрос, возвращает результат генерации',
    schema: {
      example: {
        success: true,
        data: {
          status: "succeeded",
          output: "https://replicate.delivery/xezq/3X9MTWws4jqff0ymJ2XvDp3vUlXvGGMIZZAyvCC5KAfe09xWB/tmpw1orjttk.jpeg",
          error: "null",
          send_data: {
            output_format: "jpg",
            prompt: "A golden retriever, the Dalai Lama, and Taylor Swift ring the bell at the New York stock exchange for their new company"
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка Replicate API',
    schema: {
      example: {
        message: "Replicate API error: Request to https://api.replicate.com/v1/predictions/647dx9d2hxrme0ctppq8q6t8s failed with status 404 Not Found",
        error: "Bad Request",
        statusCode: 400
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Результат не найден',
    schema: {
      example: {
        statusCode: 404,
        message: 'ID not found!',
        error: 'Not Found'
      }
    }
  })
  async getResult(@Param('id') id: string) {
    if(!id) {
      throw new NotFoundException('ID not found!');
    }
    return this.resultService.getResult(id)
  }
}
