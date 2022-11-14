import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  testServer(): string {
    return 'Server is Running ....';
  }
}
