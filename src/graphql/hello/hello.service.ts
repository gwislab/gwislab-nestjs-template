import { Injectable } from '@nestjs/common';
import { ResultHistoryModel, ResultModel } from './hello.model';
import axios from 'axios';
import { Fee, Prisma } from '@prisma/client';
import { PrismaService } from '../../services/prisma.service';
import { ErrorService } from '../../services/error.service';

const fetchUrl = 'https://tez.nodes.ejaraapis.xyz/chains/main/blocks/';

@Injectable()
export class HelloService {
  private blockHash: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly newError: ErrorService,
  ) {}

  // create fee record
  private async createFee(data: Prisma.FeeCreateInput): Promise<Fee> {
    return this.prisma.fee.create({
      data,
    });
  }

  // get all fee record
  private async getAllFee(): Promise<Fee[]> {
    return this.prisma.fee.findMany();
  }

  // get the latest block number from the block chain
  private getLatestBlockHash = async (): Promise<string> => {
    try {
      const { data } = await axios.get(fetchUrl);

      return data[0][0];
    } catch (error) {
      this.newError.throwError(error);
    }
  };

  // get the block transaction fees given the block hash or block number
  private getBlockTransactionFees = async (
    hash: string = null,
  ): Promise<number[]> => {
    try {
      this.blockHash = hash || (await this.getLatestBlockHash());

      const { data } = await axios.get(`${fetchUrl}/${this.blockHash}`);

      return data?.operations?.reduce((previous: any, current: any) => {
        const currentContent = [];

        current.forEach((el: any) => {
          currentContent.push(...el?.contents);
        });

        const transactionFees = currentContent
          ?.filter((item: any) => item?.kind === 'transaction')
          ?.map((item: any) => Number(item?.fee));

        return [...previous, ...transactionFees];
      }, []);
    } catch (error) {
      this.newError.throwError(error, hash);
    }
  };

  // compute median value given an array of numbers
  private computeMedian = (items: number[]): number => {
    if (!items.length) return undefined;

    const sortedArray = [...items].sort((a, b) => a - b);
    const middle = Math.floor(sortedArray.length / 2);

    return sortedArray.length % 2 === 0
      ? (sortedArray[middle - 1] + sortedArray[middle]) / 2
      : sortedArray[middle];
  };

  // compute the average value of a given array of numbers
  private computeAverage = (items: number[]): number => {
    if (!items.length) return undefined;

    const itemSum = items.reduce((sum, el) => sum + el, 0);

    return itemSum / items.length;
  };

  // compute the request result for the avialable routes
  computeRequestResult = async (hash: string = null): Promise<ResultModel> => {
    try {
      const transactionFees = await this.getBlockTransactionFees(hash);

      const feeData = {
        min: transactionFees.sort((a, b) => a - b)[0],
        max: transactionFees.sort((a, b) => b - a)[0],
        median: this.computeMedian(transactionFees),
        average: this.computeAverage(transactionFees),
        block: this.blockHash,
        date: new Date(),
      };

      const fee = await this.createFee(feeData);

      return fee;
    } catch (error) {
      this.newError.throwError(error, hash);
    }
  };

  // get the history of all request that is in memory
  getResultHistory = async (): Promise<ResultHistoryModel[]> => {
    try {
      const allFee = await this.getAllFee();
      return allFee.reduce(
        (previous, current) => [
          ...previous,
          {
            block: current.block,
            result_data: current,
          },
        ],
        [],
      );
    } catch (error) {}
  };
}
