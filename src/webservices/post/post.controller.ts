import { PostEntity } from './post.entity'
import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';



@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {

    constructor(private postService: PostService){}
    @Get()
    getAll(){    
        return this.postService.findAll();
    }
    @Get('/mines')
    getMyPost(@Request() req){   
        return this.postService.findByUserId(req.user.id);
    }

    @Get('/:id')
    getById(@Param('id') id: number){
        return this.postService.findById(id);
    }

   

    @Post()
    save(@Body() post : PostEntity,@Request() req){   
        return this.postService.save(post,req.user);
    }

    @Put('/:id')
    update(@Param('id') idAsString: string ,@Body() post : PostEntity){
        const id = parseInt(idAsString,10)
      return this.postService.update(id,post);  
    }

    @Delete('/:id')
    delete(@Param('id') id){
        return this.postService.delete(id);
    }
}
