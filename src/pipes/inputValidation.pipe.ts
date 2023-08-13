import { PipeTransform, Injectable, HttpStatus } from '@nestjs/common';
import { SignUpUserInput } from '../resources/users/dto/user-auth.input';
import { AppErrors } from '../services/error.service';
import i18n from 'i18next';

@Injectable()
export class ValidateSignupArgs implements PipeTransform {
  transform(value: SignUpUserInput) {
    const error = new AppErrors();

    if (value.cpassword !== value.password) {
      throw error.handler(i18n.t('passwordNotMatch'), HttpStatus.BAD_REQUEST);
    }

    if (!value.isTermsAgree) {
      throw error.handler(
        i18n.t('termsAndConditionRequired'),
        HttpStatus.BAD_REQUEST,
      );
    }

    delete value.cpassword;

    return value;
  }
}
