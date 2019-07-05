import { Test, TestingModule } from '@nestjs/testing';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationService],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', async () => {
    const reciever = 'string';
    const firstName = 'string';
    const link = 'string';
    const newMail = await service.verificationEmail(reciever, firstName, link);
    expect(newMail).toBeDefined();
  });
});
