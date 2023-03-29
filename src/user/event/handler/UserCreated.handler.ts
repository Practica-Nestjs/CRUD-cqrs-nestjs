import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../implements/UserCreated.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent) {
    Logger.log(`El usurio ${event.userCreated.name} el evento fue creado`);
  }
}
