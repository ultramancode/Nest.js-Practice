import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus } from "./boards.status";

//v1이라고 쓰면 가독성 안좋으니 uuid 별칭으로
import { RequestBoardDto } from "./dto/requestBoardDto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Transaction } from "typeorm";
import { BoardRepository } from "./borads.repository";
import { User } from "../auth/user.entity";
import { Board } from "./boards.entity";
import { ResponseBoardDto } from "./dto/reponseBoardDto";
import { async } from "rxjs";
import { AppDataSource } from "../common/configs";
@Injectable()
export class BoardsService {
  //
  // constructor(
  //   @InjectRepository(BoardRepository)
  //   private readonly boardRepository: BoardRepository,
  // ){}
  constructor(
    private readonly boardRepository: BoardRepository,
  ){}


  async createBoard(createBoardDto: RequestBoardDto, user: User): Promise<ResponseBoardDto>{
    const board = await this.boardRepository.createBoard(createBoardDto, user)
    ;
    //return 여기도..!? 그리고 transaction<ResponseBoardDto>로 타입 정하기도 가능
    return this.boardRepository.manager.transaction(async (manager) => {
      board.addUser(user);
      await manager.save(board);
      //dto 생성 메소드 나중에
      const responseBoardDto: ResponseBoardDto ={
        id: board.id,
        title: board.title,
        description: board.description,
        status: board.status,
        username: user.username
      };

      return responseBoardDto;
    })
  }

  // 이건 그냥 버전. 위엔 트랜잭션 버전.. 트랜잭션 제대로 되는지는 모르겠지만
  //   async createBoard(createBoardDto: RequestBoardDto, user: User): Promise<ResponseBoardDto>{
  //     const board = await this.boardRepository.createBoard(createBoardDto, user)
  //     ;
  //     //async await 안하니까 인식을 못하네 얘가 .. 연관관계편의메소드
  //     board.addUser(user);
  //     const responseBoardDto: ResponseBoardDto ={
  //       id: board.id,
  //       title: board.title,
  //       description: board.description,
  //       status: board.status,
  //       username: user.username
  //     };
  //     return responseBoardDto;
  //     }


  async getBoardById(id: number): Promise<Board>{
    const found = await this.boardRepository.findOneBy({id: id});
    if(!found) {
      throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`)
    }
    return found;
  }
  async getAllMyBoard(user: User): Promise<Board[]>{
    //쿼리 빌더 생성 시 사용되는 별칭은 테이블과 관련! 따라서 'board'
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id});
    const boards = await query.getMany();
    return boards;

  }

  async deleteBoard(id: number, user :User): Promise<void> {

    const result = await this.boardRepository.delete({ id, user: {id: user.id}});
    if (result.affected === 0){
      throw new NotFoundException(`해당 게시글이 없습니다.`)
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  async getAllBoards(): Promise<Board[]>{
    return this.boardRepository.find();
  }
  // async getAllBoards(user: User): Promise<Board[]>{
  //   const query = this.boardRepository.createQueryBuilder('board');
  //   query.where('board.userId = :userId', { userId: user.id});
  //   const boards = await query.getMany();
  //   return boards;
  // }


}
