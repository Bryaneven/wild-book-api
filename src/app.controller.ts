import { Controller, Get, UseGuards, Post, Request, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './core/auth/local-auth.guard';
import { AuthService } from './core/auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
