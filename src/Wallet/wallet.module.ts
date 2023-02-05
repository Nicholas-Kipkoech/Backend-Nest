import { transactionSchema } from './../Transactions/transaction.model';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { walletSchema } from './wallet.model';
import { WalletService } from './wallet.service';
import { UserSchema } from 'src/Auth/auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wallet', schema: walletSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'Transaction', schema: transactionSchema },
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
