import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  doSth(): string {
    return '/hello route';
  }
  getHello(): string {
    return 'Hello World!';
  }
}
