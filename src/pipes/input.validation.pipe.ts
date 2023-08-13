import { PipeTransform, Injectable, HttpStatus } from '@nestjs/common';
import { SignUpUserInput } from '../resources/users/dto/user-auth.input';
import { AppErrors } from '../services/error.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ValidateSignupArgs implements PipeTransform {
  constructor(
    private readonly i18n?: I18nService,
    private readonly error?: AppErrors,
  ) {}

  transform(value: SignUpUserInput) {
    if (value.cpassword !== value.password) {
      throw this.error.handler(
        this.i18n.t('errors.passwordNotMatch'),
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!value.isTermsAgree) {
      throw this.error.handler(
        this.i18n.t('errors.termsAndConditionRequired'),
        HttpStatus.BAD_REQUEST,
      );
    }

    delete value.cpassword;

    return value;
  }
}
