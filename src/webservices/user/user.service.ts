import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
            @InjectRepository(User)
            private userRepository: Repository<User>
    ){}

    findAll(){
        return this.userRepository.find()
    }

     findOne(credential): Promise<User>{
    return this.userRepository.findOne({select: ['email','id','password'],where: { email: credential}});
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

}
