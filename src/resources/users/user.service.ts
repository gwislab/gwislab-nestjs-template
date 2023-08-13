import { HttpStatus, Injectable } from '@nestjs/common';
import { AppLogger } from '../../services/logger.service';
import { SignUpUserInput, LoginUserInput } from './dto/user-auth.input';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../repositories/user.repository';
import { hashText, isHashMatch } from '../../utils/functions';
import { AppErrors } from '../../services/error.service';
import { IGetJwtPayload, IJwtPayload, IRequest, Ii18n } from 'src/interfaces';
import { getSecondsLeft } from 'src/utils/moment';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: AppLogger,
    private readonly error: AppErrors,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {
    this.logger.setContext(UserService.name);
  }

  signup = async (data: SignUpUserInput, i18n: Ii18n): Promise<User> => {
    try {
      const userExist = await this.userRepository.getUserByFilter({
        email: data.email,
      });

      if (userExist) {
        throw this.error.handler(
          i18n.t('userAlreadyExit'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const user =
        userExist ||
        (await this.userRepository.saveUserDetails({
          ...data,
          password: await hashText(data.password),
        } as any));

      const payload = { userId: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      return {
        ...user,
        token,
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  login = async (data: LoginUserInput, i18n: Ii18n): Promise<User> => {
    try {
      const user = await this.userRepository.getUserByFilter({
        email: data.email,
      });

      if (!user) {
        throw this.error.handler(i18n.t('userNotFound'), HttpStatus.NOT_FOUND);
      }

      if (
        !(await isHashMatch({ password: data.password, hash: user.password }))
      ) {
        throw this.error.handler(
          i18n.t('invalidPassword'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const payload = { userId: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      return {
        ...user,
        token,
      };
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getMe = async (userId: string, i18n: Ii18n): Promise<User> => {
    try {
      const user = await this.userRepository.getUserByFilter({
        id: userId,
      });

      if (!user) {
        throw this.error.handler(i18n.t('userNotFound'), HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw this.error.handler(error);
    }
  };

  getToken = (req: IRequest, parent: User): IGetJwtPayload => {
    try {
      const token = req?.token || parent?.token;

      if (!token) return;

      const res = this.jwtService.decode(token) as IJwtPayload;
      const secondsLeft = getSecondsLeft(moment.unix(res.exp));
      const expiresIn = secondsLeft + 's';
      if (secondsLeft <= 180) {
        return { token: this.jwtService.sign(req.user), expiresIn };
      }
      return { token, expiresIn };
    } catch (error) {
      throw this.error.handler(error);
    }
  };
}
