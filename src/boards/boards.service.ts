import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus } from "./boards.status";

//v1이라고 쓰면 가독성 안좋으니 uuid 별칭으로
import { CreateBoardDto } from "./dto/createBoardDto";
import { Board } from "./boards.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardRepository } from "./borads.repository";

@Injectable()
export class BoardsService {

  constructor(
    @InjectRepository(BoardRepository)
    private readonly boardRepository: BoardRepository,
  ){}

  createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number): Promise<Board>{
    const found = await this.boardRepository.findOneBy({id: id});

    if(!found) {
      throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`)
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    console.log('result', result);
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

}
