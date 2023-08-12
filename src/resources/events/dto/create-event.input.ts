import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateEventInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  details?: any;
}

@InputType()
export class CreateEventUserInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  tel?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  organization?: string;

  @Field(() => String, { nullable: true })
  profession?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  other?: any;

  @Field(() => String)
  eventId: string;
}

@InputType()
export class CreateEventLocationInput {
  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => Date)
  date: Date;

  @Field(() => String, { nullable: true })
  venue?: string;

  @Field(() => String, { nullable: true })
  trainingFee?: string;

  @Field(() => String, { nullable: true })
  sponsor?: string;

  @Field(() => String, { nullable: true })
  duration?: string;

  @Field(() => String, { nullable: true })
  certificates?: string;

  @Field(() => String, { nullable: true })
  registrationPrice?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  other?: any;

  @Field(() => String)
  eventId: string;
}
