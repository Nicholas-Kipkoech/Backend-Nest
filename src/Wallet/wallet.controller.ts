import { WalletService } from './wallet.service';
import { Body, Controller, Post, Param, Get } from '@nestjs/common';
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @Post(':email')
  createWallet(
    @Param('email') user: string,
    @Body('address') address: string,
    @Body('balance') balance: number,
    @Body('accountName') accountName: string,
  ): Promise<any> {
    const createWallet = this.walletService.createWallet(
      user,
      address,
      balance,
      accountName,
    );
    return createWallet;
  }
  @Get()
  getAllWallets() {
    const wallets = this.walletService.getWallets();
    return wallets;
  }
}
