import { Branch } from 'src/branch/branch.entity';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

import { Business } from '../business/business.entity';

import { Role } from './role.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => [Branch])
  @ManyToMany(() => Branch, (branch: Branch) => branch.users)
  @JoinTable()
  public branches: Branch[];

  @Field(() => [Business])
  @ManyToMany(() => Business, (business: Business) => business.users)
  @JoinTable()
  public businesses: Business[];

  @Field()
  @Column()
  public email: string;

  @Field()
  @Column()
  public firstName: string;

  @Field(() => ID)
  @ObjectIdColumn()
  public id: ObjectID;

  @Field()
  @Column()
  public lastName: string;

  @Column()
  public password: string;

  @Field(() => Int)
  @Column()
  public phoneNumber: number;

  @Field({ nullable: true })
  @Column()
  public profileImage?: string;

  @Field(() => Role)
  @ManyToOne(() => Role, (role: Role) => role.users)
  public role: Role;
}
