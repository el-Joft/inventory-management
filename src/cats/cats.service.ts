import { Inject, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
   CAT_REPOSITORY_TOKEN } from '../common/config/database.tokens.constants';

import { CatDto } from './cats.dto';
import { Cat } from './cats.entity';

@Injectable()
export class CatsService {
  public constructor(
    @Inject(CAT_REPOSITORY_TOKEN)
    private readonly catRepository: Repository<Cat>,
  ) {}

  public create(cat: CatDto): Promise<Cat> {
    return this.catRepository.create(cat).save();
  }

  public find(id: string): Promise<Cat | undefined> {
    return this.catRepository.findOne(id);
  }

  public findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }
}
