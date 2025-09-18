import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getGreeting(): { message: string } {
    return { message: 'coucou' };
  }
}
