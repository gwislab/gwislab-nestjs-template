import * as bcrypt from 'bcrypt';
import { IsMatchArgs } from 'src/interfaces';

const saltOrRounds = 10;

export const hashText = async (password: string) =>
  await bcrypt.hash(password, saltOrRounds);

export const isHashMatch = async ({ hash, password }: IsMatchArgs) =>
  await bcrypt.compare(password, hash);
