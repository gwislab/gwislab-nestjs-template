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

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLogger,
  ) {}

  @UsePipes(new ValidateSignupArgs())
  @Mutation(() => User)
  signupUser(@Args('signupUserInput') signupUserInput: SignUpUserInput) {
    this.logger.customLog();
    return this.userService.signup(signupUserInput);
  }

  @Mutation(() => User)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.userService.login(loginUserInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  me(@Context() { req }: AppContext) {
    const { user } = req;
    return this.userService.getMe(user.id);
  }

  @ResolveField(() => String, { nullable: true })
  token(@Context() { req }: AppContext, @Parent() parent) {
    const { token } = this.userService.getToken(req, parent);
    return token;
  }

  @ResolveField(() => String, { nullable: true })
  expiresIn(@Context() { req }: AppContext, @Parent() parent) {
    const { expiresIn } = this.userService.getToken(req, parent);
    return expiresIn;
  }
}
