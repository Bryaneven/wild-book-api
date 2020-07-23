import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';




@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]),
  PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [TypeOrmModule,PostService],
  controllers: [PostController],
  providers: [PostService,]
})
export class PostModule {}
