import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity)
        private postRepository : Repository<PostEntity>
    ){}


    findAll(): Promise<PostEntity[]> {
        return this.postRepository.find();
      }

    findById(id :number): Promise<PostEntity> {
        return this.postRepository.findOne(id)
    }

    save(post:PostEntity): Promise<PostEntity>{
        return this.postRepository.save(post)
    }

    update(id:number, post : PostEntity): Promise<PostEntity>{
        if( id === post.id){
            return this.postRepository.save(post);
        }else {
          throw new HttpException('The id of the url do not fit with the id of the payload',HttpStatus.BAD_REQUEST)
        }
    }

     delete(id:number): Promise<DeleteResult>{
         return this.postRepository.delete(id);
     }
}
