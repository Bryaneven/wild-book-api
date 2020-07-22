import { PostEntity } from './post.entity'
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PostService } from './post.service';



@Controller('posts')
export class PostController {

    constructor(private postService: PostService){}

    @Get()
    getAll(){
        return this.postService.findAll();
    }

    @Get('/:id')
    getById(@Param('id') id: number){
        return this.postService.findById(id);
    }

    @Post()
    save(@Body() post : PostEntity){
        return this.postService.save(post);
    }

    @Put('/:id')
    update(@Param('id') idAsString: string ,@Body() post : PostEntity){
        const id = parseInt(idAsString,10)
      return this.postService.update(id,post);  
    }

    @Delete('/:id')
    delete(@Param('id') id){
        parseInt(id,10)
        return this.postService.delete(id);
    }
}
