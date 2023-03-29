import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandHandlers } from './command/handler';
import { User } from './entities';
import { EventHandlers } from './event/handler';
import { QueryHandlers } from './queries/handler';
// import { UserRespository } from './repository/User.repository';
import { UserController } from './user.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    // UserRespository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
  exports: [TypeOrmModule],
})
export class UserModule {}
