import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Branch } from '../branch/branch.entity';
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
  @ManyToMany(() => Business, (business: Business) => business.users, {
    cascade: true,
  })
  @JoinTable()
  public businesses: Business[];

  @Field()
  @Column()
  public email: string;

  @Field()
  @Column({ default: false })
  public emailVerified: boolean;

  @Field()
  @Column()
  public firstName: string;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column({ default: false })
  public isActive: boolean;

  @Field()
  @Column()
  public lastName: string;

  @Column()
  public password: string;

  @Field()
  @Column()
  public phoneNumber: string;

  @Field()
  @Column({ nullable: true })
  public profileImage?: string;

  @Field(() => Role)
  @ManyToOne(() => Role, (role: Role) => role.users)
  public role: Role;

  @Column({ nullable: true })
  public token?: string;
}
