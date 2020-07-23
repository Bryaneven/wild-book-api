import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository, DeleteResult } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
    ) { }


    findAll(): Promise<PostEntity[]> {
        return this.postRepository.find();
    }

    findById(id: number): Promise<PostEntity> {
        return this.postRepository.findOne(id);
    }
    async findByUserId(id: number) {
        const result = await this.postRepository.find({ where: { createdBy: id } })
        return result 
    }

  

    save(post: PostEntity, user): Promise<PostEntity> {
        post.createdBy = user;
        return this.postRepository.save(post)
    }

    update(id: number, post: PostEntity): Promise<PostEntity> {
        if (id === post.id) {
            return this.postRepository.save(post);
        } else {
            throw new HttpException('The id of the url do not fit with the id of the payload', HttpStatus.BAD_REQUEST)
        }
    }

    delete(id: number): Promise<DeleteResult> {
        return this.postRepository.delete(id);
    }
}
