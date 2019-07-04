import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Business } from './business.entity';

@ObjectType()
@Entity()
export class BusinessType extends BaseEntity {
  @OneToMany(() => Business, (business: Business) => business.type)
  public businesses: Business[];

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: string;

  @Field()
  @Column()
  public name: string;
}
