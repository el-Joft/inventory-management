import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

import { BusinessService } from '../business/business.service';

import { Role } from './role.entity';
import { CreateRoleDTO, CreateUserDTO } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private businessService: BusinessService,
  ) {}
  public async allUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async createRole(name: CreateRoleDTO): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { name } });
    if (role) {
      throw new HttpException('Role already exist', HttpStatus.CONFLICT);
    }

    return this.roleRepository.create({ ...name }).save();
  }

  public async getRoleByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { name },
    });
    if (!role) {
      throw new HttpException('Role does not exist', HttpStatus.NOT_FOUND);
    }

    return role;
  }

  public async register(userDTO: CreateUserDTO): Promise<User> {
    const {
      email,
      businessName,
      phoneNumber,
      password,
    }: CreateUserDTO = userDTO;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email OR user.phoneNumber = :phoneNumber', {
        email,
        phoneNumber,
      })
      .getMany();
    let messages: { email?: string; phoneNumber?: string } = {};
    if (user.length) {
      switch (user.length) {
        case 1:
          if (user[0].phoneNumber === phoneNumber) {
            messages.phoneNumber = 'Phone Number already exist';
          }
          if (user[0].email === email) {
            messages.email = 'Email already exist';
          }
          break;
        case 2:
          messages = {
            email: 'Email already exist',
            phoneNumber: 'Phone Number already exist',
          };
          break;
        default:
          break;
      }
      throw new ConflictException({
        messages,
        status: HttpStatus.CONFLICT,
      });
    }
    const nodeEnv: string = process.env.SALT as string;
    const hashedPassword = await bcrypt.hash(password, parseInt(nodeEnv, 10));
    const role = await this.getRoleByName('Owner');
    const business = await this.businessService.register(businessName);
    const newUser = this.userRepository.create({
      email,
      phoneNumber,
      password: hashedPassword,
    });
    newUser.role = role;
    newUser.businesses = [business];
    await newUser.save();

    return newUser;
  }
}
