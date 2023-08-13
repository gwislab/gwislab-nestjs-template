import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import config from '../config/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AppErrors } from '../services/error.service';
import * as i18n from 'i18next';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly error: AppErrors,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw this.error.handler(
        i18n.t('missingAuthHeader'),
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwtSecret,
      });

      if (!payload) {
        throw this.error.handler(
          i18n.t('userAlreadyExit'),
          HttpStatus.UNAUTHORIZED,
        );
      }
      req.user = payload;
      req.token = token;
    } catch {
      throw this.error.handler(
        i18n.t('sessionExpired'),
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
