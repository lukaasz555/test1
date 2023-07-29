import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getTest(): string {
    return this.appService.doSth();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
