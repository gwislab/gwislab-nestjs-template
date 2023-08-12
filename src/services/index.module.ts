import { Module } from '@nestjs/common';
import { AppLogger } from './logger.service';
import { AppErrors } from './error.service';

@Module({
  providers: [AppErrors, AppLogger],
  exports: [AppLogger, AppErrors],
})
export class ServiceModule {}
