import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';

import { Business } from './business.entity';

@ObjectType()
@Entity()
export class BusinessType extends BaseEntity {
  @OneToMany(() => Business, (business: Business) => business.type)
  public businesses: Business[];

  @Field(() => ID)
  @ObjectIdColumn()
  public id: ObjectID;

  @Field()
  @Column()
  public name: string;
}
