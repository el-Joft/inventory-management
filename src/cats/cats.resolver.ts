// import { Param } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from 'type-graphql';

import { CatDto } from './cats.dto';
import { Cat } from './cats.entity';
import { CatsService } from './cats.service';

@Resolver()
export class CatsResolver {
  public constructor(private readonly catsService: CatsService) {}

  @Query(() => Cat)
  public cat(@Args('id') id: string): Promise<Cat | undefined> {
    return this.catsService.find(id);
  }

  @Query(() => [Cat])
  public cats(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Mutation(() => Cat)
  public createCat(@Args('input') input: CatDto): Promise<Cat> {
    return this.catsService.create(input);
  }

  @Query(() => String)
  public hello(): string {
    return 'HEllo';
  }
}
