import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus } from "./boards.status";

//v1이라고 쓰면 가독성 안좋으니 uuid 별칭으로
import { RequestBoardDto } from "./dto/requestBoardDto";
import { BoardRepository } from "./borads.repository";
import { User } from "../auth/user.entity";
import { Board } from "./boards.entity";
import { ResponseBoardDto } from "./dto/reponseBoardDto";
import { UpdateBoardDto } from "./dto/updateBoardDto";
import { async } from "rxjs";

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
    //return 여기도..!? 그리고 transaction<ResponseBoardDto>로 타입 정하기도 가능
    return this.boardRepository.manager.transaction(async (manager) => {
      const board = await this.boardRepository.createBoard(createBoardDto, user);
      board.addUser(user);
      await manager.save(board);
      //dto 생성 메소드 나중에
      const responseBoardDto: ResponseBoardDto ={
        id: board.id,
        title: board.title,
        content: board.content,
        status: board.status,
        username: user.username
      };

      return responseBoardDto;
    })
  }

  async getBoardById(id: number): Promise<Board>{


      const found = await this.boardRepository.findOneBy({id: id});
      if(!found) {
        throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`)
      }
      return found;
    }

  async getAllMyBoard(user: User): Promise<Board[]>{
    //쿼리 빌더 생성 시 사용되는 별칭은 테이블과 관련! 따라서 'board'
    return this.boardRepository.getMyBoards(user.id);
  }
  async deleteBoard(id: number, user :User): Promise<void> {
    return this.boardRepository.manager.transaction(async(manager) => {
      const result = await this.boardRepository.delete({ id, user: {id: user.id}});
      if (result.affected === 0){
        throw new NotFoundException(`해당 게시글이 없습니다.`)
      }
    });
  }


  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.manager.transaction(async (manager) => {
      const board = await this.getBoardById(id);
      board.status = status;
      await this.boardRepository.save(board);
      return board;
    })

  }
//보드만 조회하는 경우 + 트랜잭션 잘 되는지 테스트용
  // async updateBoard(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
  //   return this.boardRepository.manager.transaction(async (manager) => {
  //     const board = await this.getBoardById(id);
  //     board.updateBoard(updateBoardDto)
  //
  //     await manager.save(board);
  //     console.log(board);
  //     console.log(board.user);
  //     // board.updateBoardTest("")
  //     try {
  //       board.updateBoardTest("1")
  //     } catch (error) {
  //       console.log(error)
  //       throw new Error(error.message)
  //     }
  //     // await manager.save(board);
  //     return board;
  //   });
  // }

  // 유저까지 leftJoinAndSelect 하는 경우
    async updateBoard(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
      return this.boardRepository.manager.transaction(async (manager) => {
        const board = await this.boardRepository.getBoardAndUserById(id);
        console.log(board.user);
        board.updateBoard(updateBoardDto);
        await manager.save(board);
        return board;
      });
  }

  async getAllBoards(page: number, limit: number): Promise<{boards: ResponseBoardDto[], totalPages: number}> {
    const skip = (page -1) * limit; //건너뛸 항목 수
    const take = limit; //가져올 항목 수
    //lazy로딩이라 relations안해주면 user 못 읽어낸다!
    const boards: [Board[], number] = await this.boardRepository.findAndCount({relations: ['user'], skip, take,});
    const [boardEntities,totalCount] = boards;
    const responseBoardList: ResponseBoardDto[] = boardEntities.map((boardEntities: Board) => {
      return ResponseBoardDto.builder()
      .withId(boardEntities.id)
      .withTitle(boardEntities.title)
      .withContent(boardEntities.content)
      .withUsername(boardEntities.user.username)
      .build();
    });

    const totalPages = Math.ceil(totalCount/limit);
    return {boards: responseBoardList, totalPages};
  }
  // async getAllBoards(user: User): Promise<Board[]>{
  //   const query = this.boardRepository.createQueryBuilder('board');
  //   query.where('board.userId = :userId', { userId: user.id});
  //   const boards = await query.getMany();
  //   return boards;
  // }


}
