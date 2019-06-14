import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { businessProviders } from './business.providers';
import { BusinessService } from './business.service';

@Module({
  exports: [BusinessService],
  imports: [DatabaseModule],
  providers: [BusinessService, ...businessProviders],
})
export class BusinessModule {}
