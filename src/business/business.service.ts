import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { BUSINESS_REPOSITORY_TOKEN } from '../common/config/database.tokens.constants';

import { Business } from './business.entity';

@Injectable()
export class BusinessService {
  public constructor(
    @Inject(BUSINESS_REPOSITORY_TOKEN)
    private businessRepository: Repository<Business>,
  ) {}

  public async register(businessName: string): Promise<Business> {
    const business = await this.businessRepository.findOne({
      where: { name: businessName },
    });
    if (business) {
      throw new ConflictException({
        messages: {
          businessName: 'business Name already exist',
        },
        status: HttpStatus.CONFLICT,
      });
    }

    return this.businessRepository
      .create({ name: businessName })
      .save();
  }
}
