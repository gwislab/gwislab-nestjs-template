import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  password: string;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => Boolean)
  isTermsAgree: boolean;
}
