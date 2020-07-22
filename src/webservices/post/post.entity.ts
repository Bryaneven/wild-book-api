import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'text'})
  content: string;

  @CreateDateColumn({name:'created_date'})
  createdDate: Date;

  @ManyToOne(type => User, user => user.posts, {eager:true})
  @JoinColumn({name:'created_by'})
  createBy: User;
}