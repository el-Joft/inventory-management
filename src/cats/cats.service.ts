import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CatDto } from './cats.dto';
import { Cat } from './cats.entity';

@Injectable()
export class CatsService {
  public constructor(
    @InjectRepository(Cat)
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
