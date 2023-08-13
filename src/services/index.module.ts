import { Module } from '@nestjs/common';
import { AppLogger } from './logger.service';
import { AppErrors } from './error.service';
import { GraphQlError } from './graphql-error.service';
import { Utils } from './utils.service';

@Module({
  providers: [AppErrors, AppLogger, GraphQlError, Utils],
  exports: [AppLogger, AppErrors, GraphQlError, Utils],
  imports: [],
})
export class ServiceModule {}
