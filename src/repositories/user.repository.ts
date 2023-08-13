import { Injectable } from '@nestjs/common';
import { AppLogger } from '../services/logger.service';
import { User } from '@prisma/client';
import prisma from '../prisma';
import { FilterUserArgs } from '../interfaces';
import { CreateUserArgs } from 'src/interfaces/create-args.interface';
import { AppErrors } from 'src/services/error.service';

@Injectable()
export class UserRepository {
  constructor(
    private readonly logger: AppLogger,
    private readonly error: AppErrors,
  ) {
    this.logger.setContext(UserRepository.name);
  }

  saveUserDetails = async (data: CreateUserArgs): Promise<User> => {
    try {
      return await prisma.user.create({ data });
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getUserByFilter = async (where: FilterUserArgs): Promise<User> => {
    try {
      return await prisma.user.findFirst({ where });
    } catch (error) {
      throw this.error.handler(error);
    }
  };
}
