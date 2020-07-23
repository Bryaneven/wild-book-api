import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Like } from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { PostService } from '../post/post.service';

@Injectable()
export class UserService {

    constructor(
            @InjectRepository(User)
            private userRepository: Repository<User>,
            private postService: PostService
    ){}
   async findById(id) {
        const user= await this.userRepository.findOne(id)
       return user;
        
    }
    findAll(){
        return this.userRepository.find()
    }

     findOne(credential): Promise<User>{
    return this.userRepository.findOne({select: ['email','id','password'],where: { email: credential}});
    }

    findByName(query): Promise<User[]>{
        return this.userRepository.find({firstname: Like(`%${query.firstname}%`)})
    }
    async findMyFeed(user){
        const follows = await this.findFollows(user.id)
        follows.push(user)
        let array=[]
        for(let follow of follows){
            const test = await this.postService.findByUserId(follow.id) 
            array.push(test)        
        }       
        const result= array.reduce((acc, val) => acc.concat(val), []);    
        return result;
    }

   async findFollows(id :number){
        const user =  await this.userRepository.findOne(id,{relations:['follows']})
        return user.follows
    }

    async findFollowers(id :number){
        const user =  await this.userRepository.findOne(id,{relations:['followers']})
        return user.followers
    }

    save(user:User){
        return this.userRepository.save(user);
    }

    async findPostsLiked(id){
        const posts = await this.userRepository.findOne(id,{relations:['postsLiked']})
        return posts.postsLiked
    }

}
