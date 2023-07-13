import {
  Body,
  Controller,
  Delete,
  Get, Logger,
  Param, ParseIntPipe,
  Patch,
  Post, Put, Query, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { BoardStatus } from "./boards.status";
import { RequestBoardDto } from "./dto/requestBoardDto";
import { BoardStatusValidationPipe } from "../common/pipes/boardStatusValidationPipe";
import { Board } from "./boards.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../common/decorator/getUser.decorator";
import { User } from "../auth/user.entity";
import { BoardRepository } from "./borads.repository";
import { ResponseBoardDto } from "./dto/reponseBoardDto";

@Controller("boards")
//리퀘스트 객체안에 유저정보~
@UseGuards(AuthGuard())
export class BoardsController {
  //boardsController에서 로거 내보내주고 있다. 로그 맨앞에 []에 뭐라고 뜨는지 말하는 것
  private logger = new Logger('boardsController')
  constructor(private boardsService: BoardsService) {
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: RequestBoardDto, @GetUser() user: User): Promise<ResponseBoardDto> {
    // this.logger.verbose(`User ${user.username}가(이) 새로운 보드를 생성 중입니다.`)
    // Payload: ${JSON.stringify(createBoardDto)})
    //위에서 바로 ${createBoardDto}로 하면 [object Object]라고 나오니 stringfy해주는 것
    return this.boardsService.createBoard(createBoardDto, user);
  }
  @Get("/me")
  getAllMyBoard(@GetUser() user: User): Promise<Board[]>{
    this.logger.verbose(`User ${user.username}가(이) 게시글을 가져오려고 합니다.`)
    return this.boardsService.getAllMyBoard(user);
  }
  @Get("/:id")
  getBoardById(@Param("id", ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }


  @Delete("/:id")
  deleteBoard(@Param("id", ParseIntPipe) id: number, @GetUser() user: User ): void {
    this.boardsService.deleteBoard(id, user);
  }


  @Patch("/status/:id")
  updateBoardStatus(@Param("id", ParseIntPipe) id: number,
                    @Body("status", BoardStatusValidationPipe) status: BoardStatus
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }




  @Get()
  //@Query는 스프링의 @RequestParam 같은 역할
  getAllBoards(@Query('page') page: number = 1, @Query('limit') limit: number = 3): Promise<{boards: ResponseBoardDto[], totalPages: number}>{
    return this.boardsService.getAllBoards(page, limit);
  }




  // @Get()
  // getAllBoard(@GetUser() user: User): Promise<Board[]>{
  //   return this.boardsService.getAllBoards(user);
  // }



}


