import { User } from '../../src/user/user.entity';

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
  ];
  public create = (newUser: User): any => {
    return {
      newUser,
      save: (): any => {
        this.users.push(newUser);
      },
    };
  }
  // tslint:disable-next-line: variable-name
  public createQueryBuilder = (_param: string): UserTestRepository => {
    return this;
  }

  public where = (
    // tslint:disable-next-line: variable-name
    _param: string,
    obj: { email: string; phoneNumber: string },
  ): any => {
    return {
      getMany: (): Partial<User>[] => {
        return this.users.filter(
          (user: any) =>
            user.phoneNumber === obj.phoneNumber || user.email === obj.email,
        );
      },
    };
  }
}
