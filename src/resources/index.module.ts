import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';

@Module({
  providers: [],
  exports: [],
  imports: [UserModule],
})
export class ResourceModule {}
