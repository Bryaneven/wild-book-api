import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'text'})
  content: string;

  @CreateDateColumn({name:'created_date'})
  createdDate: Date;

  @ManyToOne(type => User, user => user.posts)
  createBy: User;
}