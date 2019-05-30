import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Cat extends BaseEntity {
  @Field(() => Int)
  @Column()
  public age: number;

  @Field()
  @Column()
  public breed: string;

  @Field(() => ID)
  @ObjectIdColumn()
  public id: ObjectID;

  @Field()
  @Column()
  public name: string;
}
