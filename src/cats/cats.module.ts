import { Module } from '@nestjs/common';
import { catProviders } from 'src/cats/cats.providers';

import { DatabaseModule } from '../database/database.module';

import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';

@Module({
  exports: [CatsService],
  imports: [DatabaseModule],
  providers: [CatsResolver, CatsService, ...catProviders],
})
export class CatsModule {}
