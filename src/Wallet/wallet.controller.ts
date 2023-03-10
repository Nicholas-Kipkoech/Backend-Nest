import { WalletService } from './wallet.service';
import { Body, Controller, Post, Param, Get, Patch } from '@nestjs/common';
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @Post('create/:email')
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
  //fetch all wallets
  @Get()
  getAllWallets() {
    const wallets = this.walletService.getWallets();
    return wallets;
  }

  //get wallets per user using userID
  @Get('user/:userId')
  getUserWallet(@Param('userId') userID: string) {
    const userWallet = this.walletService.getUserWallets(userID);
    return userWallet;
  }
  //fetch one wallet using walletID

  @Get('wallet/:walletID')
  getWallet(@Param('walletID') walletID: string) {
    const wallet = this.walletService.getOneWallet(walletID);
    return wallet;
  }
  //fund wallet or add income
  @Patch('fund/:id')
  updateWallet(
    @Param('id') walletID: string,
    @Body('balance') balance: number,
  ) {
    const newUpdatedWallet = this.walletService.fundWallet(balance, walletID);
    return newUpdatedWallet;
  }
}
