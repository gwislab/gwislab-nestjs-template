import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import * as i18n from 'i18next';

@Injectable()
export class AppErrors {
  handler(
    error: any,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException(i18n.t('badRequest'), error);
      case HttpStatus.NOT_FOUND:
        throw new NotFoundException(i18n.t('404'), error);
      case HttpStatus.FORBIDDEN:
        throw new ForbiddenException(i18n.t('forbidden'), error);
      case HttpStatus.UNAUTHORIZED:
        throw new UnauthorizedException(i18n.t('unauthorized'), error);
      case HttpStatus.TOO_MANY_REQUESTS:
        throw new RequestTimeoutException(i18n.t('tooManyRequest'), error);

      default: {
        if (
          error instanceof ForbiddenException ||
          error instanceof UnauthorizedException ||
          error instanceof RequestTimeoutException ||
          error instanceof BadRequestException ||
          error instanceof NotFoundException
        ) {
          throw error;
        }
        throw new InternalServerErrorException(
          error,
          i18n.t('somethingWentWrong'),
        );
      }
    }
  }
}
