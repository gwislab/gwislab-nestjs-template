import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';

@Injectable()
export class ErrorService extends HttpException {
  throwError = (error: AxiosError, requestValue: string = null) => {
    switch (error?.response?.status) {
      case HttpStatus.BAD_REQUEST:
        if (requestValue) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Block with hash '${requestValue}' does not exist in the blockchain`,
            },
            HttpStatus.NOT_FOUND,
          );
        }
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Invalid request, please check request url',
          },
          HttpStatus.BAD_REQUEST,
        );

      case HttpStatus.NOT_FOUND:
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Block with hash '${requestValue}' does not exist in the blockchain`,
          },
          HttpStatus.NOT_FOUND,
        );

      default:
        console.log(
          '%cerror.service.ts line:27 error.request',
          'color: #007acc;',
          error,
        );
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'An Error Occured in Server',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  };
}
