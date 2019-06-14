import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Business } from '../business/business.entity';
import { BusinessService } from '../business/business.service';
import { User } from '../user/user.entity';

import { Role } from './role.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Business, Role])],

  providers: [UserService, UserResolver, BusinessService],
})
export class UserModule {}
