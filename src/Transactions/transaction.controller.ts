import { TransactionService } from './transaction.service';
import { Body, Controller, Param, Post, Get } from '@nestjs/common';
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Post(':user/:wallet')
  createTransaction(
    @Param('user') user: string,
    @Param('wallet') wallet: string,
    @Body('desc') desc: string,
    @Body('amount') amount: number,
  ): Promise<any> {
    const newTransaction = this.transactionService.createTransaction(
      user,
      wallet,
      desc,
      amount,
    );
    return newTransaction;
  }
  @Get('fetch-all')
  getAllTx() {
    const transactions = this.transactionService.getAllTx();
    return transactions;
  }
}
