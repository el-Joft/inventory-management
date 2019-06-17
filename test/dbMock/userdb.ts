import { Business } from '../../src/business/business.entity';
import { User } from '../../src/user/user.entity';

const aBusiness = new Business();
aBusiness.name = 'testBusiness';

export class UserTestRepository {
  private users: Partial<User>[] = [
    {
      email: 'test1@gmail.com',
      firstName: 'Test',
      lastName: 'TestlastName',
      password: 'Password1?',
      phoneNumber: '08135566771',
    },
    {
      email: 'test2@gmail.com',
      firstName: 'Test',
      lastName: 'TestlastName',
      password: 'Password1?',
      phoneNumber: '08135566772',
    },
    {
      email: 'test3@gmail.com',
      firstName: 'Test',
      lastName: 'TestlastName',
      password: 'Password1?',
      phoneNumber: '08135566773',
    },
    {
      businesses: [aBusiness],
      email: 'email@email.com',
      firstName: 'Test',
      lastName: 'TestlastName',
      password: '$2a$10$E5CAwzwdmg2V6P6Aio.vZeuVXrdcXk64Fs.O/fS1VfZUKj3DxKgi.',
      phoneNumber: '08100000001',
    },
  ];
  public create = (newUser: User): any => {
    return {
      newUser,
      save: (): any => {
        this.users.push(newUser);
      },
    };
  }

  public createQueryBuilder = (): UserTestRepository => this;

  public leftJoinAndSelect = (): UserTestRepository => this;

  public where = (
    // tslint:disable-next-line: variable-name
    _param: string,
    obj: Partial<User>,
  ): any => {
    return {
      getMany: (): Partial<User>[] => {
        return this.users.filter(
          (user: any) =>
            user.phoneNumber === obj.phoneNumber || user.email === obj.email,
        );
      },

      getOne: (): Partial<User> | undefined => {
        const key = Object.keys(obj)[0] as keyof User;

        return this.users.find((user: Partial<User>) => user[key] === obj[key]);
      },
    };
  }
}
