import { TransactionModule } from './Transactions/transaction.module';
import { WalletModule } from './Wallet/wallet.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './Auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    WalletModule,
    TransactionModule,
    MongooseModule.forRoot('YOUR MONGOOSE STRING'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
