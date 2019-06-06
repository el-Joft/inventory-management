import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getHello(): string {
    return 'Welcome to SudJot an Inventory Management System';
  }
}
