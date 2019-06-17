import { HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

import { User } from '../user/user.entity';

import { Role } from './role.entity';
import { CreateRoleDTO, CreateUserDTO, LoginUserDTO, UserRO } from './user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  public constructor(private userService: UserService) {}

  @Mutation(() => Role)
  public createRole(@Args('name') name: string): Promise<Role> {
    const role: CreateRoleDTO = { name };

    return this.userService.createRole(role);
  }

  @Query(() => UserRO)
  public async login(@Args('data')
  {
    businessName,
    password,
    phoneNumberOrEmail,
  }: LoginUserDTO): Promise<UserRO> {
    const user = await this.userService.login({
      businessName,
      password,
      phoneNumberOrEmail,
    });

    const token = jwt.sign(
      {
        firstName: user.firstName,
        id: user.id,
        lastName: user.lastName,
        role: user.role.name,
      },
      process.env.AUTH_TOKEN_SECRET!,
    );

    this.userService.updateToken(user.id, token);

    return {
      token,
      user,
      message: {
        message: 'Login Successful',
        status: HttpStatus.OK,
      },
    };
  }

  @Mutation(() => UserRO)
  public register(@Args('data')
  {
    businessName,
    email,
    password,
    phoneNumber,
  }: CreateUserDTO): UserRO {
    const user = this.userService.register({
      businessName,
      email,
      password,
      phoneNumber,
    });
    const message = {
      message: 'Account created successfully',
      status: HttpStatus.CREATED,
    };
    const toReturn = {
      message,
      user,
    };

    return toReturn;
  }

  @Query(() => User)
  public users(): Promise<User[]> {
    return this.userService.allUsers();
  }
}
