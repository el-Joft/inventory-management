import { Business } from '../../src/business/business.entity';

export class BusinessTestRepository {
  private businesses: Partial<Business>[] = [
    {
      name: 'owner',
    },
    {
      name: 'user',
    },
  ];
  public create = (business: Business): any => {
    return {
      save: (): any => {
        this.businesses.push(business);

        return business;
      },
    };
  }

  public findOne = (newBusiness: {
    where: Partial<Business>;
  }): Partial<Business> | undefined => {
    return this.businesses.find(
      (business: any) => newBusiness.where.name === business.name,
    );
  }
}
