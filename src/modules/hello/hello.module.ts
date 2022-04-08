import { Module } from '@nestjs/common';
import { HelloService } from './hello.service';
import { FeesController } from './hello.controller';
import { PrismaService } from 'src/services/prisma.service';
import { ErrorService } from 'src/services/error.service';

@Module({
  providers: [HelloService, PrismaService, ErrorService],
  controllers: [FeesController],
})
export class HelloModule {}
