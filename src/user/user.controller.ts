import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './command/implement/CreateUser.command';

import { CreateUserDto, UpdateUserDto } from './dto';
import { GetAllUserQuery } from './queries/implements';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllUserQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return '';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return '';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return '';
  }
}
