import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';


@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  exports: [TypeOrmModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
