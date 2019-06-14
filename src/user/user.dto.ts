import { HttpStatus } from '@nestjs/common';
import { IsEmail, IsNotEmpty, Length, Validate } from 'class-validator';
import { Field, InputType, Int, ObjectType } from 'type-graphql';

import { IsPhoneNumber } from '../shared/validation/isPhoneNumber';

import { User } from './user.entity';

@InputType()
export class CreateUserDTO {
  @IsNotEmpty()
  @Length(1, 255)
  @Field()
  public businessName: string;

  @IsNotEmpty()
  @Length(1, 255)
  @IsEmail()
  @Field()
  public email: string;

  @IsNotEmpty()
  @Length(1, 255)
  @Field()
  public password: string;

  @IsNotEmpty()
  @Length(1, 255)
  @Validate(IsPhoneNumber)
  @Field()
  public phoneNumber: string;
}

@ObjectType()
class MessageType {
  @Field()
  public message: string;
  @Field(() => Int)
  public status: HttpStatus;
}

// creating a type for the response object
@ObjectType()
export class UserRO {
  @Field(() => MessageType)
  public message: MessageType;
  @Field()
  public token?: string;
  @Field(() => User)
  public user: Promise<User>;
}

export class CreateRoleDTO {
  @Field()
  @IsNotEmpty()
  @Length(1, 255)
  public name: string;
}
