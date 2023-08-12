import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EventsService } from './events.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event, EventLocation, EventUser } from './entities/event.entity';
import { FilterEventInput } from './dto/filter-event.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.create(createEventInput);
  }

  @Query(() => [Event])
  getAllEvents(
    @Args('filterEventInput', { nullable: true })
    filterEventInput: FilterEventInput,
  ) {
    return this.eventsService.findAllEvent(filterEventInput);
  }

  @Query(() => Event)
  getEvent(
    @Args('filterEventInput', { nullable: true })
    filterEventInput: FilterEventInput,
  ) {
    return this.eventsService.findOneEvent(filterEventInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Event)
  updateEvent(@Args('updateEventInput') updateEventInput: UpdateEventInput) {
    return this.eventsService.updateEvent(
      updateEventInput.id,
      updateEventInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Event)
  removeEvent(@Args('id') id: string) {
    return this.eventsService.removeEvent(id);
  }

  @ResolveField(() => [EventUser], { nullable: true })
  eventUser(@Parent() parent) {
    return this.eventsService.findAllEventUser({ eventId: parent.id });
  }

  @ResolveField(() => [EventLocation], { nullable: true })
  eventLocation(@Parent() parent) {
    return this.eventsService.findAllEventLocation({ eventId: parent.id });
  }
}
