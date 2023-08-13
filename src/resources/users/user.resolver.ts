import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Context,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { SignUpUserInput, LoginUserInput } from './dto/user-auth.input';
import { AppLogger } from '../../services/logger.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UseGuards, UsePipes } from '@nestjs/common';
import AppContext from 'src/interfaces/context.interface';
import { ValidateSignupArgs } from '../../pipes/inputValidation.pipe';
import { AppErrors } from 'src/services/error.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLogger,
    private readonly error: AppErrors,
  ) {}

  @UsePipes(new ValidateSignupArgs())
  @Mutation(() => User)
  signupUser(
    @Args('signupUserInput') signupUserInput: SignUpUserInput,
    @Context() { i18n }: AppContext,
  ) {
    try {
      return this.userService.signup(signupUserInput, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @Mutation(() => User)
  loginUser(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() { i18n }: AppContext,
  ) {
    try {
      return this.userService.login(loginUserInput, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  me(@Context() { req, i18n }: AppContext) {
    try {
      const { user } = req;
      return this.userService.getMe(user.id, i18n);
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @ResolveField(() => String, { nullable: true })
  token(@Context() { req }: AppContext, @Parent() parent) {
    try {
      const { token } = this.userService.getToken(req, parent);
      return token;
    } catch (error) {
      throw this.error.handler(error);
    }
  }

  @ResolveField(() => String, { nullable: true })
  expiresIn(@Context() { req }: AppContext, @Parent() parent) {
    try {
      const { expiresIn } = this.userService.getToken(req, parent);
      return expiresIn;
    } catch (error) {
      throw this.error.handler(error);
    }
  }
}
