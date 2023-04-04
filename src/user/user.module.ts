import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandHandlers } from './command/handler';
import { User } from './entities';
import { EventHandlers } from './event/handler';
import { QueryHandlers } from './queries/handler';
import { UserRepository } from './repository/userRepository.repository';
import { UserController } from './user.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User, UserRepository])],
  controllers: [UserController],
  providers: [
    UserRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
  exports: [TypeOrmModule],
})
export class UserModule {}
