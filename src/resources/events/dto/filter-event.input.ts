import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  CreateEventInput,
  CreateEventLocationInput,
  CreateEventUserInput,
} from './create-event.input';

@InputType()
export class FilterEventInput extends PartialType(CreateEventInput) {
  @Field(() => String, { nullable: true })
  id?: string;
}

@InputType()
export class FilterEventUserInput extends PartialType(CreateEventUserInput) {
  @Field(() => String, { nullable: true })
  id?: string;
}

@InputType()
export class FilterEventLocationInput extends PartialType(
  CreateEventLocationInput,
) {
  @Field(() => String, { nullable: true })
  id?: string;
}
