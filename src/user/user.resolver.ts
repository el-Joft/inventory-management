import { HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '../user/user.entity';

import { Role } from './role.entity';
import { CreateRoleDTO, CreateUserDTO, UserRO } from './user.dto';
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
