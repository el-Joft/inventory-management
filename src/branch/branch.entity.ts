import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Business } from '../business/business.entity';
import { User } from '../user/user.entity';

@ObjectType()
@Entity()
export class Branch extends BaseEntity {
  @ManyToOne(() => Business, (business: Business) => business.branches)
  public business: Business;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column()
  public location: string;

  @ManyToMany(() => User, (user: User) => user.branches)
  public users: Branch[];
}
