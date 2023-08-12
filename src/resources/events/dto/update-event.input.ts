import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  CreateEventInput,
  CreateEventLocationInput,
} from './create-event.input';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field(() => String)
  id: string;
}

@InputType()
export class UpdateEventLocationInput extends PartialType(
  CreateEventLocationInput,
) {
  @Field(() => String)
  id: string;
}
