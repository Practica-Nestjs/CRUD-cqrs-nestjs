import { AggregateRoot } from '@nestjs/cqrs';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { UpdateUserDto } from '../dto/UpdateUser.dto';
import { UserCreatedEvent } from '../event/implements/UserCreated.event';

export class UserRoot extends AggregateRoot {
  constructor(private user: CreateUserDto | UpdateUserDto) {
    super();
  }

  crearUsuario(user: CreateUserDto) {
    this.apply(new UserCreatedEvent(user));
  }
}
