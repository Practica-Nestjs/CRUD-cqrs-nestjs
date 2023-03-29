import { CreateUserDto } from 'src/user/dto';

export class UserCreatedEvent {
  constructor(public readonly userCreated: CreateUserDto) {}
}
