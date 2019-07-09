import { HttpStatus } from '@nestjs/common';
import { IsAlpha, IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { Field, InputType, Int, ObjectType } from 'type-graphql';

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
  @IsAlpha()
  @Length(1, 255)
  @Field()
  public firstName: string;

  @IsNotEmpty()
  @Length(1, 255)
  @IsAlpha()
  @Field()
  public lastName: string;

  @IsNotEmpty()
  @Matches(/^[A-Za-z][A-Za-z0-9]*$/, {
    message: 'Password cannot contain spaces',
  })
  @Length(1, 255)
  @Field()
  public password: string;

  @IsNotEmpty()
  @Length(1, 255)
  @Matches(/^[0]\d{7,15}$/, {
    message: 'Phone Number must be valid',
  })
  @Field()
  public phoneNumber: string;
}

@InputType()
export class LoginUserDTO {
  @IsNotEmpty()
  @Length(1, 255)
  @Field()
  public businessName: string;

  @IsNotEmpty()
  @Length(1, 255)
  @Field()
  public password: string;

  @IsNotEmpty()
  @Length(1, 255)
  @Matches(/^\w{2,}@\w{2,}\.\w{2,}|[0]\d{7,15}$/, {
    message: 'isPhoneNumberOrEmail is neither a phone number nor an Email',
  })
  @Field()
  public phoneNumberOrEmail: string;
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
  @Field({ nullable: true })
  public token?: string;
  @Field(() => User)
  public user: Promise<User> | User;
}

export class CreateRoleDTO {
  @Field()
  @IsNotEmpty()
  @Length(1, 255)
  public name: string;
}
