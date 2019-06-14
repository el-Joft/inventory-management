import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Business } from './business.entity';
import { BusinessService } from './business.service';

@Module({
  imports: [TypeOrmModule.forFeature([Business])],

  providers: [BusinessService],
})
export class BusinessModule {}
