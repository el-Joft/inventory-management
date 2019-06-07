import { User } from 'src/user/user.entity';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

import { Business } from '../business/business.entity';

@ObjectType()
@Entity()
export class Branch extends BaseEntity {
  @ManyToOne(() => Business, (business: Business) => business.branches)
  public business: Business;

  @Field(() => ID)
  @ObjectIdColumn()
  public id: ObjectID;

  @Field()
  @Column()
  public location: string;

  @ManyToMany(() => User, (user: User) => user.branches)
  public users: Branch[];
}
