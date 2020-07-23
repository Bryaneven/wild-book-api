
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, JoinColumn, OneToMany } from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @IsEmail()
  @Column({unique: true})
  email: string;

  @IsNotEmpty()
  @Exclude()
  @Column({select:false})
  password: string;

  @CreateDateColumn({name:'register_date'})
  
  registerDate: Date;

  @Column({name:'picture_url',nullable:true})
  pictureUrl: string;

  @OneToMany(type => PostEntity, post => post.createdBy)
  posts: PostEntity[];

  @ManyToMany(type => User, user => user.followers, {cascade: true})
  @JoinTable({name:'user_friends'})
  follows: User[];

  @ManyToMany(type => User , user => user.follows)
  followers: User[];

  @ManyToMany(type => PostEntity , post => post.likesList, {cascade: true})
  @JoinTable({name:'post_likes'})
  postsLiked: PostEntity[];

}