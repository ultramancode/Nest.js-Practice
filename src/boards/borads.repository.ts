import { DataSource, Repository } from "typeorm";
import { Board } from "./boards.entity";
import { Injectable } from "@nestjs/common";
import { RequestBoardDto } from "./dto/requestBoardDto";
import { BoardStatus } from "./boards.status";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../auth/user.entity";
@Injectable()
export class BoardRepository extends Repository<Board>{

  constructor(private readonly dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
  // constructor(private readonly dataSource: DataSource) {
  //   super(Board, dataSource.createEntityManager());
  // }

  // constructor(@InjectRepository(Board) private readonly repository: Repository<Board>){
  //   super(repository.target, repository.manager, repository.queryRunner);
  // }


  async createBoard(createBoardDto: RequestBoardDto, user: User): Promise<Board> {
    const {title, description, } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user: user
      });
    await this.save(board);
    return board;
  }

  // async getAllmyBoard(user: User): Promise<Board[]> {
  //   const boards :Board[] = this.find(user)
  //   return await this.createQueryBuilder('board')
  //   .where(boards.user = :user, {user: user})
  //   .
  // }

}