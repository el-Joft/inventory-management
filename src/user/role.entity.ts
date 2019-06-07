import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';

import { User } from './user.entity';

@ObjectType()
@Entity()
export class Role extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  public id: ObjectID;

  @Field()
  @Column()
  public name: string;

  @Field(() => [User])
  @OneToMany(() => User, (user: User) => user.role)
  public users: User[];
}
