import { Injectable } from '@nestjs/common';
import { AppLogger } from '../services/logger.service';
import { User } from '@prisma/client';
import prisma from '../prisma';
import { FilterUserArgs } from '../interfaces';

@Injectable()
export class UserRepository {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext(UserRepository.name);
  }

  saveUserDetails = async (data: Partial<User>): Promise<User> =>
    await prisma.user.create({ data: data as User });

  getUserByFilter = async (where: FilterUserArgs): Promise<User> =>
    await prisma.user.findFirst({ where });
}
