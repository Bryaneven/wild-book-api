import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller()
export class UserController {

    constructor(private userService: UserService){}
    @Post('user')
    getOne(@Body() credential){
        return this.userService.findOne(credential);
    }

    @Post('signup')
    save(@Body() user:User){
        return this.userService.save(user);
    }
}
