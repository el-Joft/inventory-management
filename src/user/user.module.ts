import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { BusinessService } from '../business/business.service';
import {
  NotificationService } from '../shared/notification/notification.service';

import { usersProviders } from './user.providers';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  imports: [DatabaseModule],
  providers: [
    UserService,
    UserResolver,
    BusinessService,
    NotificationService,
    ...usersProviders,
  ],
})
export class UserModule {}
