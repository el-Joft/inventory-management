import { HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import 'dotenv/config';

import { generateLoginToken } from '../utils/helperFunctions';

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

  @Mutation(() => UserRO)
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

    const token = generateLoginToken({
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
      role: user.role.name,
    });

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
    firstName,
    lastName,
  }: CreateUserDTO): UserRO {
    const user = this.userService.register({
      businessName,
      email,
      firstName,
      lastName,
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
}
