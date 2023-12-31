import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./boards.status";
import { User } from "../auth/user.entity";
import { RequestBoardDto } from "./dto/requestBoardDto";
import { UpdateBoardDto } from "./dto/updateBoardDto";
import { INVALID_EXCEPTION_FILTER } from "@nestjs/core/errors/messages";
import { ConflictException } from "@nestjs/common";
import { updateOutput } from "ts-jest/dist/legacy/compiler/compiler-utils";

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
  // getBoard(): Board {
  //   return this;
  // }
  // getBoardUser(): User {
  //   return this.user;
  // }

  public updateBoard(updateBoardDto: UpdateBoardDto): void{
    if(updateBoardDto.title == ""){
      throw new ConflictException();
    }
    this.title = updateBoardDto.title;
    this.content = updateBoardDto.content;
  }
  public updateBoardTest(title: string): void{
    if(title == ""){
      throw new ConflictException("트랜잭션 테스트! 제목에 공백을 넣을 수 없습니다.");
    }
    this.title = title;
  }

}
