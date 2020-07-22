import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { PostService } from '../post/post.service';

@Controller()
export class UserController {

    constructor(private userService: UserService, private postService: PostService){}

    @Get('/users')
    getAll(){
        return this.userService.findAll();
    }

    @Get('users/:id/follows')
    getUserFollow(@Param('id') id :number){
        return this.userService.findFollows(id)
    }
    @Get('users/:id/followers')
    getUserFollowers(@Param('id') id :number){
        return this.userService.findFollowers(id)
    }

    @Post('signup')
    save(@Body() user:User){
        return this.userService.save(user);
    }

    @Get('user/:id/posts')
    getUserPosts(@Param('id') id: number){
        return this.postService.findByUserId(id);
    }

    @Put('/users/:id')
    update(@Param("id") id : number, @Body() user :User){
        return this.userService.save(user)
    }
}
