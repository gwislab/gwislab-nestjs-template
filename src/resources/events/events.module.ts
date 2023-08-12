import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { RepositoryModule } from 'src/repositories/index.module';
import { ServiceModule } from 'src/services/index.module';
import { EventUsersResolver } from './eventUsers.resolver';
import { EventLocationsResolver } from './eventLocations.resolver';

@Module({
  providers: [
    EventsResolver,
    EventUsersResolver,
    EventLocationsResolver,
    EventsService,
  ],
  imports: [RepositoryModule, ServiceModule],
})
export class EventsModule {}
