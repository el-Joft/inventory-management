import { Connection } from 'typeorm';

import { Business } from '../business/business.entity';
import {
  BUSINESS_REPOSITORY_TOKEN,
  DB_CONNECTION_TOKEN,
  ROLE_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../common/config/database.tokens.constants';
import { User } from '../user/user.entity';

import { Role } from './role.entity';

export const usersProviders = [
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
    provide: ROLE_REPOSITORY_TOKEN,
    useFactory: (connection: Connection): any => connection.getRepository(Role),
  },
];

export const businessTypeProvider = [
  {
    inject: [DB_CONNECTION_TOKEN],
    provide: ROLE_REPOSITORY_TOKEN,
    useFactory: (connection: Connection): any => connection.getRepository(Role),
  },
];
