import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./boards.status";
import { User } from "../auth/user.entity";

@Entity()
export class Board extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  status: BoardStatus;
  //타입, 접근하려면 어떻게 해야하는지 user에서 user.boards~, eager false가 lazy
  @ManyToOne(type => User, user => user.boards, {eager: false})
  user: User;

  public addUser(user: User): void {
    this.user = user;
    if(!user.boards.includes(this)) {
      user.boards.push(this)
    }
  }

}
