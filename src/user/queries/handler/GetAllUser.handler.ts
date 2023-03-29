import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetAllUserQuery } from '../implements/';
import { User } from '../../entities';

@QueryHandler(GetAllUserQuery)
export class GetAllUserHandler implements IQueryHandler<GetAllUserQuery> {
  constructor(
    // private readonly repositoryUser: UserRespository
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async execute(query: GetAllUserQuery): Promise<any> {
    console.log(`Async Get All User...`);
    return this.userRepository.find();
  }
}
