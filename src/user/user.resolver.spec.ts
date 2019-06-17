import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateRoleDTO, CreateUserDTO, LoginUserDTO } from '../user/user.dto';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let spyService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useFactory: (): any => ({
            createRole: jest.fn(() => true),
            login: jest.fn(() => ({ id: 4, role: { name: 'name' } })),
            register: jest.fn(() => true),
            updateToken: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    spyService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('register', () => {
    it('should register the user', async () => {
      const params: CreateUserDTO = {
        businessName: 'TestName',
        email: 'testing@gmail.com',
        firstName: 'Test',
        lastName: 'TestlastName',
        password: 'Password1?',
        phoneNumber: '08135566778',
      };
      resolver.register(params);
      expect(spyService.register).toHaveBeenCalledWith(params);
    });
  });

  describe('register', () => {
    it('should create the role', async () => {
      const params = 'Major';
      const result: CreateRoleDTO = { name: 'Major' };
      resolver.createRole(params);
      expect(spyService.createRole).toHaveBeenCalledWith(result);
    });
  });

  describe('login', () => {
    it('should logins in the user and save a token into the db', async () => {
      const params: LoginUserDTO = {
        businessName: 'business',
        password: 'Password1',
        phoneNumberOrEmail: '08135566778',
      };
      const loginResult = await resolver.login(params);

      expect(Object.keys(loginResult)).toEqual(['token', 'user', 'message']);
      expect(spyService.login).toHaveBeenCalledWith(params);
      expect(spyService.updateToken).toHaveBeenCalled();
      expect(loginResult.message.message).toEqual('Login Successful');
      expect(loginResult.message.status).toEqual(HttpStatus.OK);
    });
  });
});
