import { DataSource, Repository } from "typeorm";
import { Board } from "./boards.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
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
    const {title, content, } = createBoardDto;
    const board = this.create({
      title,
      content: content,
      status: BoardStatus.PUBLIC,
      user: user
      });
    await this.save(board);
    return board;
  }

  async getBoardAndUserById(id: number): Promise<Board> {
    const queryBuilder = this.createQueryBuilder('board');
    queryBuilder.where('board.id = :id', { id } );
    queryBuilder.leftJoinAndSelect('board.user', 'user');
    const found = await queryBuilder.getOne();
    if(!found) {
      throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`);
    }
    return found;
  }
  //his.boardRepository.createQueryBuilder('board');
  //       query.where('board.userId = :userId', { userId: user.id});
  //       const boards = await query.getMany();
  //       return boards;
  //     });
  //   }

  //
  async getMyBoards(userId: number){
    const queryBuilder = this.createQueryBuilder('board');
    queryBuilder.where('board.userId = :userId', {userId: userId});
    const boards = await queryBuilder.getMany();
    return boards;
  }


  // async getAllmyBoard(user: User): Promise<Board[]> {
  //   const boards :Board[] = this.find(user)
  //   return await this.createQueryBuilder('board')
  //   .where(boards.user = :user, {user: user})
  //   .
  // }

}