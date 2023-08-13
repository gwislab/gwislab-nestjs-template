import { Injectable } from '@nestjs/common';
import { ErrorSearchValues } from 'src/config/constants';

@Injectable()
export class GraphQlError {
  // , { args: { field } }
  extractError(message: string, field: string) {
    return (message = message?.includes(ErrorSearchValues.NOT_NULL)
      ? field
        ? 'errors.fieldRequired'
        : 'errors.requiredField'
      : message);
  }
}
