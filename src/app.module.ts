import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BranchModule } from './branch/branch.module';
import { BusinessModule } from './business/business.module';
import { CatsModule } from './cats/cats.module';
import { databaseConfig } from './dbConfig/config';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

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
      synchronize: true,
      type: 'postgres',
      url: DB_URL,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      introspection: true,
      playground: true,
    }),
    SharedModule,
  ],
  providers: [AppService],
})
export class AppModule {}
