import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AppLogger } from '../services/logger.service';
import { EventRepository } from './event.repository';

@Module({
  providers: [UserRepository, EventRepository, AppLogger],
  exports: [UserRepository, EventRepository],
})
export class RepositoryModule {}
