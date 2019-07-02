import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Branch } from '../branch/branch.entity';
import { User } from '../user/user.entity';

import { BusinessType } from './businessType.entity';

@ObjectType()
@Entity()
export class Business extends BaseEntity {
  @Field(() => [Branch], { nullable: true })
  @OneToMany(() => Branch, (branch: Branch) => branch.business, {
    nullable: true,
  })
  public branches?: Branch[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  public email?: string;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public location?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public logo?: string;

  @Field()
  @Column()
  public name: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  public phoneNumber?: number;

  @Field({ nullable: true })
  @ManyToOne(() => BusinessType, (type: BusinessType) => type.businesses, {
    nullable: true,
  })
  public type?: BusinessType;

  @ManyToMany(() => User, (user: User) => user.businesses)
  public users: User[];
}
