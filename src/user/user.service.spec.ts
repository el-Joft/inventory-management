import { Test, TestingModule } from '@nestjs/testing';

import { RoleTestRepository } from '../../test/dbMock/roledb';
import { UserTestRepository } from '../../test/dbMock/userdb';
import { BusinessService } from '../business/business.service';
import {
  BUSINESS_REPOSITORY_TOKEN,
  ROLE_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../common/config/database.tokens.constants';
import { NotificationService } from '../shared/notification/notification.service';

import { CreateRoleDTO, CreateUserDTO, LoginUserDTO } from './user.dto';
import { UserService } from './user.service';

describe('UserService', () => {
  let testingModule: TestingModule;
  let service: UserService;
  let spyUserRepository: any;
  let spyRoleRepository: any;
  let user: UserTestRepository;
  let role: RoleTestRepository;

  beforeAll(async () => {
    role = new RoleTestRepository();
    user = new UserTestRepository();
    testingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useFactory: (): any => ({}),
        },
        {
          provide: BUSINESS_REPOSITORY_TOKEN,
          useFactory: (): any => ({
            findOne: jest.fn(() => true),
            save: jest.fn(() => true),
          }),
        },
        {
          provide: ROLE_REPOSITORY_TOKEN,
          useFactory: (): any => ({
            findOne: jest.fn(() => true),
          }),
        },
        {
          provide: BusinessService,
          useFactory: (): any => ({
            register: jest.fn(() => true),
          }),
        },
        {
          provide: NotificationService,
          useFactory: (): any => ({
            verificationEmail: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    service = testingModule.get<UserService>(UserService);
    spyUserRepository = testingModule.get(USER_REPOSITORY_TOKEN);
    spyRoleRepository = testingModule.get(ROLE_REPOSITORY_TOKEN);
    spyUserRepository.createQueryBuilder = user.createQueryBuilder;
  });

  describe('register', () => {
    it('should save an user in the database', async () => {
      const params: CreateUserDTO = {
        businessName: 'TestName',
        email: 'testing@gmail.com',
        firstName: 'Test',
        lastName: 'TestlastName',
        password: 'Password1?',
        phoneNumber: '08135566778',
      };
      spyUserRepository.create = user.create;
      expect(await service.register(params)).toBeDefined();
    });

    it('should checked user exist in the database', async () => {
      const params: CreateUserDTO = {
        businessName: 'TestName',
        email: 'testing@gmail.com',
        firstName: 'Test',
        lastName: 'TestlastName',
        password: 'Password1?',
        phoneNumber: '08135566778',
      };
      spyUserRepository.create = user.create;
      try {
        await service.register(params);
      } catch (e) {
        expect(e.response.messages).toEqual({
          email: 'Email already exist',
          phoneNumber: 'Phone Number already exist',
        });
      }
    });

    it('should checked email exist in the database', async () => {
      const params: CreateUserDTO = {
        businessName: 'TestName',
        email: 'test1@gmail.com',
        firstName: 'Test',
        lastName: 'TestlastName',
        password: 'Password1?',
        phoneNumber: '08135566770',
      };
      spyUserRepository.create = user.create;
      try {
        await service.register(params);
      } catch (e) {
        expect(e.response.messages).toEqual({
          email: 'Email already exist',
        });
      }
    });

    it('should checked phoneNumber exist in the database', async () => {
      const params: CreateUserDTO = {
        businessName: 'TestName',
        email: 'test0@gmail.com',
        firstName: 'Test',
        lastName: 'TestlastName',
        password: 'Password1?',
        phoneNumber: '08135566778',
      };
      spyUserRepository.create = user.create;
      try {
        await service.register(params);
      } catch (e) {
        expect(e.response.messages).toEqual({
          phoneNumber: 'Phone Number already exist',
        });
      }
    });

    it('should checked existence in two databases', async () => {
      const params: CreateUserDTO = {
        businessName: 'TestName',
        email: 'test1@gmail.com',
        firstName: 'Test',
        lastName: 'TestlastName',
        password: 'Password1?',
        phoneNumber: '08135566778',
      };
      spyUserRepository.create = user.create;
      try {
        await service.register(params);
      } catch (e) {
        expect(e.response.messages).toEqual({
          email: 'Email already exist',
          phoneNumber: 'Phone Number already exist',
        });
      }
    });
  });

  describe('createRole', () => {
    it('should create a role in the database', async () => {
      const params: CreateRoleDTO = {
        name: 'Master Test',
      };
      spyRoleRepository.findOne = role.findOne;
      spyRoleRepository.create = role.create;
      expect(await service.createRole(params)).toBeDefined();
    });

    it('should throw an error for existence in the database', async () => {
      const params: CreateRoleDTO = {
        name: 'Master Test',
      };
      spyRoleRepository.findOne = role.findOne;
      spyRoleRepository.create = role.create;
      try {
        await service.createRole(params);
      } catch (e) {
        expect(e.response.messages).toEqual({
          name: 'Role already exist',
        });
      }
    });
  });

  describe('getRoleByName', () => {
    it('should throw an error for none existence in the database', async () => {
      const params = 'Master Testy';
      spyRoleRepository.findOne = role.findOne;
      try {
        await service.getRoleByName(params);
      } catch (e) {
        expect(e.response.messages).toEqual({
          name: 'Role does not exist',
        });
      }
    });
  });

  describe('updateToken', () => {
    it('should call update method of "userRepository"', async () => {
      spyUserRepository.update = jest.fn();
      service.updateToken('userId', 'token');
      expect(spyUserRepository.update).toHaveBeenCalledWith('userId', {
        token: 'token',
      });
    });
  });

  describe('login', () => {
    const nonExistingUser: LoginUserDTO = {
      businessName: 'business name',
      password: 'password',
      phoneNumberOrEmail: 'wrongemail@email.com',
    };

    const userWithWrongPassword: LoginUserDTO = {
      businessName: 'business name',
      password: 'password',
      phoneNumberOrEmail: 'email@email.com',
    };

    const userWithWrongBusiness: LoginUserDTO = {
      businessName: 'business name',
      password: 'sudhons',
      phoneNumberOrEmail: 'email@email.com',
    };

    const userWithValidCred1: LoginUserDTO = {
      businessName: 'testBusiness',
      password: 'sudhons',
      phoneNumberOrEmail: 'email@email.com',
    };

    const userWithValidCred2: LoginUserDTO = {
      businessName: 'testBusiness',
      password: 'sudhons',
      phoneNumberOrEmail: '08100000001',
    };

    it('should throw 404 Error if user does not exist', async () => {
      try {
        await service.login(nonExistingUser);
      } catch (error) {
        expect(error.response.messages).toEqual({
          phoneNumberOrEmail: 'Invalid crendetials',
        });
      }
    });

    it('should throw 404 Error if password is wrong', async () => {
      try {
        await service.login(userWithWrongPassword);
      } catch (error) {
        expect(error.response.messages).toEqual({
          password: 'Invalid crendetials',
        });
      }
    });

    it('should throw 404 Error if business is wrong', async () => {
      try {
        await service.login(userWithWrongBusiness);
      } catch (error) {
        expect(error.response.messages).toEqual({
          businessName: 'Invalid crendetials',
        });
      }
    });

    it('should successfully logs user in with email', async () => {
      const logedInUser = await service.login(userWithValidCred1);

      expect(logedInUser.email).toEqual(userWithValidCred1.phoneNumberOrEmail);
    });

    it('should successfully logs user in with phone number', async () => {
      const logedInUser = await service.login(userWithValidCred2);

      expect(logedInUser.phoneNumber).toEqual(
        userWithValidCred2.phoneNumberOrEmail,
      );
    });
  });
});
