import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AppLogger } from '../services/logger.service';
import { AppErrors } from 'src/services/error.service';

@Module({
  providers: [UserRepository, AppLogger, AppErrors],
  exports: [UserRepository],
})
export class RepositoryModule {}
