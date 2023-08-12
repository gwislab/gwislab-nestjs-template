import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { i18n } from 'i18next';
import { User } from '../resources/users/entities/user.entity';

interface RequestExt {
  token: string;
  user: User;
}

export type IRequest = RequestExt & Request;

export default interface AppContext {
  jwt?: string;
  prisma: PrismaClient;
  req: IRequest;
  res: Response;
  locale: 'en' | 'fr';
  i18n: Omit<i18n, 't'> & { t: (msg: string, _?: any) => string };
}

export interface IJwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}
export interface IGetJwtPayload {
  token: string;
  expiresIn: string;
}
