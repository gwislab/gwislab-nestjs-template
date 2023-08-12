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

@Injectable()
export class AppErrors {
  handler(
    error: any,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException('Bad Request', error);
      case HttpStatus.NOT_FOUND:
        throw new NotFoundException('404 Error', error);
      case HttpStatus.FORBIDDEN:
        throw new ForbiddenException('Forbidden', error);
      case HttpStatus.UNAUTHORIZED:
        throw new UnauthorizedException('Unauthorized', error);
      case HttpStatus.TOO_MANY_REQUESTS:
        throw new RequestTimeoutException('Too Many Request', error);

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
        throw new InternalServerErrorException(error, 'Something went wrong');
      }
    }
  }
}
