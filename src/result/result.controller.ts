import {Controller, Get, HttpCode, NotFoundException, Param} from '@nestjs/common';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get(':id')
  @HttpCode(200)
  async getResult(@Param('id') id: string) {
    if(!id) {
      throw new NotFoundException('ID not found!');
    }
    return this.resultService.getResult(id)
  }
}
