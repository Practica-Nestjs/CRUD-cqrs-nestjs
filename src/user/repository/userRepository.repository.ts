import { Injectable, NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { DataSource, Repository } from 'typeorm';

import { CreateUserDto } from '../dto/CreateUser.dto';
import { UpdateUserDto } from '../dto/UpdateUser.dto';
import { User } from '../entities';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getAllUser(): Promise<User[]> {
    return await this.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User Not Found whit Id ${id}`);
    }
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    try {
      const newUser = this.create(user);
      await this.save(newUser);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(`Error whit create database`);
    }
  }

  async updateUser(id: string, userChange: UpdateUserDto): Promise<User> {
    const userDB = await this.getUserById(id);
    this.merge(userDB, userChange);
    return await this.save(userDB);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.getUserById(id);
    this.delete(user);
    return user;
  }
}
