import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { transactionSchema } from './transaction.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { walletSchema } from 'src/Wallet/wallet.model';
import { UserSchema } from 'src/Auth/auth.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaction', schema: transactionSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Wallet', schema: walletSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
