import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BranchModule } from './branch/branch.module';
import { BusinessModule } from './business/business.module';
import { CatsModule } from './cats/cats.module';
import { databaseConfig } from './dbConfig/config';
import { UserModule } from './user/user.module';

config();
const NODE_ENV = process.env.NODE_ENV || 'development';

const DB_URL = process.env[databaseConfig[NODE_ENV].DB_URL]!;
const entities = process.env[databaseConfig[NODE_ENV].ENTITIES]!;

@Module({
  controllers: [AppController],
  imports: [
    CatsModule,
    BranchModule,
    BusinessModule,
    UserModule,
    TypeOrmModule.forRoot({
      entities: [entities],
      logging: true,
      synchronize: false,
      type: 'mongodb',
      url: DB_URL,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      introspection: true,
      playground: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
