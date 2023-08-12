import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EventsService } from './events.service';
import { CreateEventUserInput } from './dto/create-event.input';

import { Event, EventUser } from './entities/event.entity';
import { FilterEventUserInput } from './dto/filter-event.input';

@Resolver(() => EventUser)
export class EventUsersResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation(() => EventUser)
  createEventUser(
    @Args('createEventUserInput') createEventUserInput: CreateEventUserInput,
  ) {
    return this.eventsService.createUser(createEventUserInput);
  }

  @Query(() => [EventUser])
  getAllEventUsers(
    @Args('filterEventInput', { nullable: true })
    filterEventUserInput: FilterEventUserInput,
  ) {
    return this.eventsService.findAllEventUser(filterEventUserInput);
  }

  @Query(() => EventUser)
  getEventUser(
    @Args('filterEventUserInput', { nullable: true })
    filterEventUserInput: FilterEventUserInput,
  ) {
    return this.eventsService.findOneEventUser(filterEventUserInput);
  }

  @ResolveField(() => Event)
  event(@Parent() parent: EventUser) {
    return this.eventsService.findOneEvent({ id: parent.eventId });
  }
}
