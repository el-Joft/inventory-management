import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import 'dotenv/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BranchModule } from './branch/branch.module';
import { BusinessModule } from './business/business.module';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  imports: [
    CatsModule,
    BranchModule,
    BusinessModule,
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      introspection: true,
      playground: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
