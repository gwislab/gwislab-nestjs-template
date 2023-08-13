import { HttpStatus, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { join } from 'path';
import { AppLogger } from './services/logger.service';
import prisma from './lib/prisma';
import { JwtModule } from '@nestjs/jwt';
import { RepositoryModule } from './repositories/index.module';
import { ServiceModule } from './services/index.module';
import { ResourceModule } from './resources/index.module';
import { GraphQLError } from 'graphql';
import { ErrorSearchValues } from './config/constants';
import { HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { GraphQlError } from './services/graphql-error.service';

const langOptions = [
  'gwislab-user-locale',
  'lang',
  'Accept-Language',
  'language',
];

const logger = new AppLogger();
const gErrors = new GraphQlError();
@Module({
  imports: [
    ConfigModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: config.defaultLanguage,
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        {
          use: HeaderResolver,
          options: langOptions,
        },
        {
          use: QueryResolver,
          options: langOptions,
        },
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: config.isDevEnv,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: (ctx: any) => {
        logger.setContext('AppModule:context');
        const lang = langOptions.find((option) => ctx.req.headers[option]);
        const locale = ctx.req.headers[lang];

        // if (!locale) {
        //   throw new Error('Missing Header: `gwislab-user-locale`');
        // }

        return {
          ...ctx,
          locale,
          prisma,
        };
      },
      formatError: (error: GraphQLError): any => {
        logger.setContext('AppModule:formatError');

        if (!config.isDevEnv && HttpStatus.INTERNAL_SERVER_ERROR) {
          logger.log(JSON.stringify({ error }, null, 2));
        }

        if (config.isDevEnv) {
          logger.log(JSON.stringify({ error }, null, 2));
        }

        const response = error.extensions?.response as any;

        const path = error.path;
        const code = error.extensions?.code;
        const validatorMessage =
          typeof response?.message == 'string'
            ? response?.message
            : response?.message?.[0];
        const validatorError = response?.error;
        let message = validatorMessage || error.message;

        const field = message
          ?.split(ErrorSearchValues.INPUT)?.[1]
          ?.split(`\"`)?.[0];

        message = gErrors.extractError(message, field);

        return {
          code,
          field,
          path,
          message,
          error: validatorError,
        };
      },
    }),
    JwtModule.register({
      global: true,
      secret: config.jwtSecret,
      signOptions: { expiresIn: config.jwtExpiresIn },
    }),
    ResourceModule,
    RepositoryModule,
    ServiceModule,
  ],
})
export class AppModule {}
