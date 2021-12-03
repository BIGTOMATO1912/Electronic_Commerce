import { Injectable, HttpException, Inject, ConsoleLogger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import "reflect-metadata";
// import { JwtService } from '@nestjs/jwt';

import { use } from 'passport';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    // private readonly jwtService: JwtService

  ) { }

  public async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(username: string) {
    const as = await this.userRepository.find({ where: { email: username } });
    if (as.length > 0) {
      const User = {
        id: as[0].id,
        full_name: as[0].full_name,
        phone: as[0].phone,
        email: as[0].email,
        adress: as[0].adress,
        password: as[0].password,
        level: as[0].level
      }
      return User;
    }
    else {
      console.log("2");
    }
  }

}