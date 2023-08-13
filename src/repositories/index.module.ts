import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AppLogger } from '../services/logger.service';

@Module({
  providers: [UserRepository, AppLogger],
  exports: [UserRepository],
})
export class RepositoryModule {}
