import { PipeTransform, Injectable, HttpStatus } from '@nestjs/common';
import { SignUpUserInput } from '../resources/users/dto/user-auth.input';
import { AppErrors } from '../services/error.service';

@Injectable()
export class ValidateSignupArgs implements PipeTransform {
  transform(value: SignUpUserInput) {
    const error = new AppErrors();

    if (value.cpassword !== value.password) {
      throw error.handler(
        'cpassword and password must be the same',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!value.isTermsAgree) {
      throw error.handler(
        'Please agree to our terms and use',
        HttpStatus.BAD_REQUEST,
      );
    }
    delete value.cpassword;

    return value;
  }
}
