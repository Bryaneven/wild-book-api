import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PostModule } from '../post/post.module';
@Module({
    imports: [TypeOrmModule.forFeature([User]),PostModule],
    exports: [TypeOrmModule,UserService],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
