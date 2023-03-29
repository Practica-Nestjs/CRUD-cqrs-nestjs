import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateUserCommand } from '../implement/CreateUser.command';
import { UserRoot } from '../../model/User.model';
import { User } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, User>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private readonly eventBus: EventBus,
    private readonly eventBus: EventPublisher,
  ) {}

  // Todo: Agregar el prublicador de eventos en el metodo
  // Agregar el repositorio central para el trabajo en para centralizar los metodos
  async execute(command: CreateUserCommand): Promise<User> {
    const { createUserDto } = command;
    const newUser = this.userRepository.create(createUserDto);
    const root = new UserRoot(createUserDto);
    const temporal = this.eventBus.mergeObjectContext(root);
    temporal.crearUsuario(createUserDto);
    temporal.commit();
    await this.userRepository.save(newUser);
    return newUser;
  }
}
