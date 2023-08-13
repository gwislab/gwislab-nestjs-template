import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { User } from '../resources/users/entities/user.entity';
import { PubSub } from 'graphql-subscriptions';
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
  pubsub: PubSub;
  locale: 'en' | 'fr';
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
