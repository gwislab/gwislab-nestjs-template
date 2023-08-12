import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { join } from 'path';
import { AppLogger } from './services/logger.service';
import * as i18n from 'i18next';
import prisma from './prisma';
import { UserModule } from './resources/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RepositoryModule } from './repositories/index.module';
import { ServiceModule } from './services/index.module';
import { EventsModule } from './resources/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: config.isDevEnv,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: (ctx: any) => {
        const logger = new AppLogger();
        logger.setContext('AppModule');

        const locale = ctx.req.headers['paraklete-user-locale'];

        if (!locale) {
          throw new Error('Missing Header: `paraklete-user-locale`');
        }

        i18n.changeLanguage(locale, (error) => {
          if (error) {
            throw new Error(
              'Error: user locale is invalid, acceptable locale are `en` | `fr`',
            );
          }
        });
        return {
          ...ctx,
          i18n,
          locale,
          prisma,
        };
      },
    }),
    JwtModule.register({
      global: true,
      secret: config.jwtSecret,
      signOptions: { expiresIn: config.jwtExpiresIn },
    }),
    EventsModule,
    UserModule,
    RepositoryModule,
    ServiceModule,
  ],
})
export class AppModule {}
