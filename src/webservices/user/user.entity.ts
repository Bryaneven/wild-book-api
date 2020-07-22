
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, JoinColumn, OneToMany } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({name:'register_date'})
  
  registerDate: Date;

  @Column({name:'picture_url'})
  pictureUrl: string;

  @OneToMany(type => PostEntity, post => post.createBy)
  posts: PostEntity[];

  @ManyToMany(type => User)
  @JoinTable({name:'user_friends'})
  friends: User[];

}