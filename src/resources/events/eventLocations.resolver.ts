import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EventsService } from './events.service';
import { CreateEventLocationInput } from './dto/create-event.input';
import { UpdateEventLocationInput } from './dto/update-event.input';
import { Event, EventLocation } from './entities/event.entity';
import { FilterEventLocationInput } from './dto/filter-event.input';
import { AuthGuard } from 'src/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => EventLocation)
export class EventLocationsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => EventLocation)
  createEventLocation(
    @Args('createEventLocationInput')
    createEventLocationInput: CreateEventLocationInput,
  ) {
    return this.eventsService.createLocation(createEventLocationInput);
  }

  @Query(() => [EventLocation])
  getAllEventLocations(
    @Args('filterEventLocationInput', { nullable: true })
    filterEventLocationInput: FilterEventLocationInput,
  ) {
    return this.eventsService.findAllEventLocation(filterEventLocationInput);
  }

  @Query(() => EventLocation)
  getEventLocation(
    @Args('filterEventLocationInput', { nullable: true })
    filterEventLocationInput: FilterEventLocationInput,
  ) {
    return this.eventsService.findOneEventLocation(filterEventLocationInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => EventLocation)
  updateEventLocation(
    @Args('updateEventLocationInput')
    updateEventLocationInput: UpdateEventLocationInput,
  ) {
    return this.eventsService.updateEventLocation(
      updateEventLocationInput.id,
      updateEventLocationInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => EventLocation)
  removeEventLocation(@Args('id') id: string) {
    return this.eventsService.removeEventLocation(id);
  }

  @ResolveField(() => Event)
  event(@Parent() parent: EventLocation) {
    return this.eventsService.findOneEvent({ id: parent.eventId });
  }
}
