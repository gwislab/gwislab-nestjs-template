import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateEventInput,
  CreateEventLocationInput,
  CreateEventUserInput,
} from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { AppErrors } from 'src/services/error.service';
import { EventRepository } from 'src/repositories/event.repository';
import { AppLogger } from 'src/services/logger.service';
import { Event, EventLocation, EventUser } from './entities/event.entity';
import {
  FilterEventInput,
  FilterEventLocationInput,
  FilterEventUserInput,
} from './dto/filter-event.input';

@Injectable()
export class EventsService {
  constructor(
    private readonly logger: AppLogger,
    private readonly error: AppErrors,
    private readonly eventRepository: EventRepository,
  ) {
    this.logger.setContext(EventsService.name);
  }

  create = async (data: CreateEventInput): Promise<Event> => {
    try {
      const eventExit = await this.eventRepository.getEventByFilter({
        title: data.title,
      });

      if (eventExit) {
        throw this.error.handler('Event already exit', HttpStatus.BAD_REQUEST);
      }

      return this.eventRepository.createEvent(data as Event);
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  createUser = async (data: CreateEventUserInput): Promise<EventUser> => {
    try {
      const eventExit = await this.eventRepository.getEventByFilter({
        id: data.eventId,
      });

      if (!eventExit) {
        throw this.error.handler('Event does exit', HttpStatus.NOT_FOUND);
      }

      return this.eventRepository.createEventUser(data as EventUser);
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  createLocation = async (
    data: CreateEventLocationInput,
  ): Promise<EventLocation> => {
    try {
      const eventExit = await this.eventRepository.getEventByFilter({
        id: data.eventId,
      });

      if (!eventExit) {
        throw this.error.handler('Event does exit', HttpStatus.NOT_FOUND);
      }

      return this.eventRepository.createEventLocation(data as EventLocation);
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  findAllEvent = async (data: FilterEventInput): Promise<Event[]> => {
    try {
      return this.eventRepository.getManyEventsByFilter(data);
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  findAllEventUser = async (
    data: FilterEventUserInput,
  ): Promise<EventUser[]> => {
    try {
      return this.eventRepository.getManyEventUsersByFilter(data);
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  findAllEventLocation = async (
    data: FilterEventLocationInput,
  ): Promise<EventLocation[]> => {
    try {
      return this.eventRepository.getManyEventLocationsByFilter(data);
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  findOneEvent = async (data: FilterEventInput): Promise<Event> => {
    try {
      return this.eventRepository.getEventByFilter(data);
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  findOneEventUser = async (data: FilterEventUserInput): Promise<EventUser> => {
    try {
      return this.eventRepository.getEventUserByFilter(data);
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  findOneEventLocation = async (
    data: FilterEventLocationInput,
  ): Promise<EventLocation> => {
    try {
      return this.eventRepository.getEventLocationByFilter(data);
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  updateEvent = (id: string, data: UpdateEventInput) => {
    return this.eventRepository.updateEvent(id, data);
  };

  updateEventLocation = (id: string, data: UpdateEventInput) => {
    return this.eventRepository.updateEventLocation(id, data);
  };

  removeEvent = async (id: string): Promise<Event> => {
    try {
      return this.eventRepository.deleteEvent(id);
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  removeEventLocation = async (id: string): Promise<EventLocation> => {
    try {
      return this.eventRepository.deleteEventLocation(id);
    } catch (error) {
      throw this.error.handler(error);
    }
  };
}
