import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { RepositoryModule } from '../../repositories/index.module';
import { ServiceModule } from '../../services/index.module';

@Module({
  providers: [UserResolver, UserService],
  imports: [RepositoryModule, ServiceModule],
})
export class UserModule {}
