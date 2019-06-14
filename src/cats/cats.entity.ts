import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @PrimaryGeneratedColumn()
  public id: string;

  @Field()
  @Column()
  public name: string;
}
