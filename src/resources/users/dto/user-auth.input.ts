import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from '@nestjs/class-validator';

@InputType()
export class SignUpUserInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => Boolean)
  isTermsAgree: boolean;

  @Field(() => String)
  password: string;

  @Field(() => String)
  cpassword: string;
}

@InputType()
export class LoginUserInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  password: string;
}
