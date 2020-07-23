import { Controller, Get, Param, Post, Body, Put, Query, Request, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { PostService } from '../post/post.service';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller()
export class UserController {

    constructor(private userService: UserService, private postService: PostService){}
    @Get('/getme')
    findme(@Request() req){
    
        
        return this.userService.findById(req.user.id)
    }
    @Get('/likedposts')
    getMyLikedPost(@Request() req){
        return this.userService.findPostsLiked(req.user.id)
    }
    @Get('/getmyfollows')
    findMyFollows(@Request() req){
        return this.userService.findFollows(req.user.id)
    }
    @Get('/posts/:id/likes')
    getPostLikes(@Param('id') id ){
        return this.postService.findPostLikes(id);
    }
    @Get('/myfeed')
    getMyfeed(@Request() req){
        return this.userService.findMyFeed(req.user)
    }

    @Get('/users')
    getAll(){
        return this.userService.findAll();
    }
    @Get('/users/:id')
    findById(@Param('id') id: number){
        return this.userService.findById(id);
    }
    @Get('/search')
    getUsersByName(@Query() query){
        return this.userService.findByName(query);
    }
  
 

    @Get('users/:id/follows')
    getUserFollow(@Param('id') id :number){
        return this.userService.findFollows(id)
    }
    @Get('users/:id/followers')
    getUserFollowers(@Param('id') id :number){
        return this.userService.findFollowers(id)
    }

    @Get('users/:id/posts')
    getUserPosts(@Param('id') id: number){
        return this.postService.findByUserId(id);
    }

    @Put('/users/:id')
    update(@Param("id") id : number, @Body() user :User){
        return this.userService.save(user)
    }
}
