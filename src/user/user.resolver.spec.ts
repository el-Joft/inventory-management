import { Test, TestingModule } from '@nestjs/testing';

import { CreateRoleDTO, CreateUserDTO } from '../user/user.dto';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let spyService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useFactory: (): any => ({
            createRole: jest.fn(() => true),
            register: jest.fn(() => true),
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

  it('should add the user', async () => {
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

  it('should add the role', async () => {
    const params = 'Major';
    const result: CreateRoleDTO = { name: 'Major' };
    resolver.createRole(params);
    expect(spyService.createRole).toHaveBeenCalledWith(result);
  });
});
