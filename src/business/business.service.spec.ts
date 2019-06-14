import { Test, TestingModule } from '@nestjs/testing';

import { BusinessTestRepository } from '../../test/dbMock/businessdb';
import { BUSINESS_REPOSITORY_TOKEN } from '../common/config/database.tokens.constants';

import { BusinessService } from './business.service';

describe.only('BusinessService', () => {
  let service: BusinessService;
  let spyBusinessRepository: any;
  let business: BusinessTestRepository;

  beforeAll(async () => {
    business = new BusinessTestRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessService,
        {
          provide: BUSINESS_REPOSITORY_TOKEN,
          useFactory: (): any => ({
            findOne: jest.fn(() => true),
            save: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    service = module.get<BusinessService>(BusinessService);
    spyBusinessRepository = module.get(BUSINESS_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a business', async () => {
    const params = 'TestBusiness';
    spyBusinessRepository.findOne = business.findOne;
    spyBusinessRepository.create = business.create;
    expect(await service.register(params)).toBeDefined();
  });

  it('should return an error the upon creation', async () => {
    const params = 'TestBusiness';
    spyBusinessRepository.findOne = business.findOne;
    spyBusinessRepository.create = business.create;
    try {
      await service.register(params);
    } catch (e) {
      expect(e.response.messages).toEqual({
        businessName: 'business Name already exist',
      });
    }
  });
});
