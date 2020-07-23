import { Controller, Get, UseGuards, Post, Request, Body} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './core/auth/local-auth.guard';
import { AuthService } from './core/auth/auth.service';
import { User } from './webservices/user/user.entity';
import { UserService } from './webservices/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService, private userService : UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('signup')
  save(@Body() user:User){
      return this.userService.save(user);
  }
}
