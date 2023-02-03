import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { walletSchema } from './wallet.model';
import { WalletService } from './wallet.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wallet', schema: walletSchema }]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
