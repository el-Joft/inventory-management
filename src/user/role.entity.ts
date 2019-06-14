import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';

@ObjectType()
@Entity()
export class Role extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column()
  public name: string;

  @Field(() => [User])
  @OneToMany(() => User, (user: User) => user.role)
  public users: User[];
}
