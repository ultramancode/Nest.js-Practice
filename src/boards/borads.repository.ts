import { DataSource, Repository } from "typeorm";
import { Board } from "./boards.entity";
import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/createBoardDto";
import { BoardStatus } from "./boards.status";
import { InjectRepository } from "@nestjs/typeorm";

export class BoardRepository extends Repository<Board>{

  // constructor(private dataSource: DataSource) {
  //   super(Board, dataSource.createEntityManager());
  // }

  constructor(@InjectRepository(Board) private readonly repository: Repository<Board>){
    super(repository.target, repository.manager, repository.queryRunner);
  }


  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const {title, description} = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      });
    await this.save(board);
    return board;
  }

}