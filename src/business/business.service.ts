import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Business } from './business.entity';

@Injectable()
export class BusinessService {
  public constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
  ) {}

  public async register(businessName: string): Promise<Business> {
    let business = await this.businessRepository.findOne({
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
    business = await this.businessRepository
      .create({ name: businessName })
      .save();

    return business;
  }
}
