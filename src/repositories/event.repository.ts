import { Injectable } from '@nestjs/common';
import { AppLogger } from '../services/logger.service';
import { Event, EventUser, EventLocation } from '@prisma/client';
import prisma from '../prisma';
import {
  FilterEventArgs,
  FilterEventLocationArgs,
  FilterEventUserArgs,
} from '../interfaces';

@Injectable()
export class EventRepository {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext(EventRepository.name);
  }

  createEvent = async (data: Partial<Event>): Promise<Event> =>
    await prisma.event.create({ data: data as Event });

  createEventUser = async (data: Partial<EventUser>): Promise<EventUser> =>
    await prisma.eventUser.create({ data: data as EventUser });

  createEventLocation = async (
    data: Partial<EventLocation>,
  ): Promise<EventLocation> =>
    await prisma.eventLocation.create({ data: data as EventLocation });

  updateEvent = async (id: string, data: Partial<Event>): Promise<Event> =>
    await prisma.event.update({ where: { id }, data: data as Event });

  updateEventLocation = async (
    id: string,
    data: Partial<EventLocation>,
  ): Promise<EventLocation> =>
    await prisma.eventLocation.update({
      where: { id },
      data: data as EventLocation,
    });

  getEventByFilter = async (where: FilterEventArgs): Promise<Event> =>
    await prisma.event.findFirst({
      where,
      include: {
        eventLocation: true,
        eventUser: true,
      },
    });

  getManyEventsByFilter = async (where: FilterEventArgs): Promise<Event[]> =>
    await prisma.event.findMany({
      where,
      include: {
        eventLocation: true,
        eventUser: true,
      },
    });

  getEventUserByFilter = async (
    where: FilterEventUserArgs,
  ): Promise<EventUser> =>
    await prisma.eventUser.findFirst({
      where,
    });

  getManyEventUsersByFilter = async (
    where: FilterEventUserArgs,
  ): Promise<EventUser[]> =>
    await prisma.eventUser.findMany({
      where,
    });

  getEventLocationByFilter = async (
    where: FilterEventLocationArgs,
  ): Promise<EventLocation> =>
    await prisma.eventLocation.findFirst({
      where,
    });

  getManyEventLocationsByFilter = async (
    where: FilterEventLocationArgs,
  ): Promise<EventLocation[]> =>
    await prisma.eventLocation.findMany({
      where,
    });

  deleteEvent = async (id: string): Promise<Event> =>
    await prisma.event.delete({
      where: { id },
    });

  deleteEventLocation = async (id: string): Promise<EventLocation> =>
    await prisma.eventLocation.delete({
      where: { id },
    });
}
