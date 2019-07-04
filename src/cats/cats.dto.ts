import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CatDto {
  @Field(() => Int)
  public age: number;

  @Field()
  public breed: string;

  @Field()
  public name: string;
}
