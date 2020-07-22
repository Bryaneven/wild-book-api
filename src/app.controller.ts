import { Controller, Get, UseGuards, Post, Request, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './core/auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
