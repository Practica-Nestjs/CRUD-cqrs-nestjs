import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../entities';
import { UserRoot } from '../../model/User.model';
import { UserRepository } from '../../repository/userRepository.repository';
import { CreateUserCommand } from '../implement/CreateUser.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, User>
{
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventPublisher,
  ) {}

  // Todo: Agregar el prublicador de eventos en el metodo
  // Agregar el repositorio central para el trabajo en para centralizar los metodos
  async execute(command: CreateUserCommand): Promise<User> {
    const { createUserDto } = command;
    const newUser = await this.userRepository.createUser(createUserDto);
    const userRoot = new UserRoot(createUserDto);
    const user = this.eventBus.mergeObjectContext(userRoot);
    user.crearUsuario(createUserDto);
    user.commit();
    return newUser;
  }
}
