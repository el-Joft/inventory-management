import { Connection } from 'typeorm';

import {
  BUSINESS_REPOSITORY_TOKEN,
  BUSINESSTYPE_REPOSITORY_TOKEN,
  DB_CONNECTION_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../common/config/database.tokens.constants';
import { User } from '../user/user.entity';

import { Business } from './business.entity';
import { BusinessType } from './businessType.entity';

export const businessProviders = [
  {
    inject: [DB_CONNECTION_TOKEN],
    provide: BUSINESS_REPOSITORY_TOKEN,
    useFactory: (connection: Connection): any =>
      connection.getRepository(Business),
  },
  {
    inject: [DB_CONNECTION_TOKEN],
    provide: USER_REPOSITORY_TOKEN,
    useFactory: (connection: Connection): any => connection.getRepository(User),
  },
  {
    inject: [DB_CONNECTION_TOKEN],
    provide: BUSINESSTYPE_REPOSITORY_TOKEN,
    useFactory: (connection: Connection): any =>
      connection.getRepository(BusinessType),
  },
];

export const businessTypeProvider = [
  {
    inject: [DB_CONNECTION_TOKEN],
    provide: BUSINESSTYPE_REPOSITORY_TOKEN,
    useFactory: (connection: Connection): any =>
      connection.getRepository(BusinessType),
  },
];
