import * as bcrypt from 'bcrypt';
import { IsMatchArgs } from 'src/interfaces';
import { AppErrors } from 'src/services/error.service';

const saltOrRounds = 10;
const appError = new AppErrors();

export const hashText = async (password: string) => {
  try {
    return await bcrypt.hash(password, saltOrRounds);
  } catch (error) {
    throw appError.handler(error);
  }
};

export const isHashMatch = async ({ hash, password }: IsMatchArgs) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw appError.handler(error);
  }
};
