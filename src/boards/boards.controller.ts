import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Patch,
  Post, Put,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { BoardStatus } from "./boards.status";
import { CreateBoardDto } from "./dto/createBoardDto";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation-pipe";
import { Board } from "./boards.entity";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {
  }

  // @Get('/')
  // getAllBoard(): Board[] {
  //   {
  //     return this.boardsService.getAllBoards();
  //   }
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get("/:id")
  getBoardById(@Param("id", ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete("/:id")
  deleteBoard(@Param("id", ParseIntPipe) id: number): void {
    this.boardsService.deleteBoard(id);
  }


  @Patch("/status/:id")
  updateBoardStatus(@Param("id", ParseIntPipe) id: number,
                    @Body("status", BoardStatusValidationPipe) status: BoardStatus
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Get()
  getAllBoard(): Promise<Board[]>{
    return this.boardsService.getAllBoards();
  }


}


