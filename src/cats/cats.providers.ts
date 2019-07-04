import { Connection } from 'typeorm';

import {
  CAT_REPOSITORY_TOKEN,
  DB_CONNECTION_TOKEN,
} from '../common/config/database.tokens.constants';

import { Cat } from './cats.entity';

export const catProviders = [
  {
    inject: [DB_CONNECTION_TOKEN],
    provide: CAT_REPOSITORY_TOKEN,
    useFactory: (connection: Connection): any => connection.getRepository(Cat),
  },
];
