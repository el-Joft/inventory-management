import { Role } from '../../src/user/role.entity';

export class RoleTestRepository {
  private roles: Partial<Role>[] = [
    {
      name: 'owner',
    },
    {
      name: 'user',
    },
  ];
  public create = (role: Role): any => {
    return {
      save: (): any => {
        this.roles.push(role);

        return role;
      },
    };
  }

  public findOne = (roleObj: {
    where: Partial<Role>;
  }): Partial<Role> | undefined => {
    return this.roles.find((role: any) => roleObj.where.name === role.name);
  }
}
