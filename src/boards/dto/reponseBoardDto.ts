import { IsNotEmpty } from "class-validator";
import { BoardStatus } from "../boards.status";

export class ResponseBoardDto {
  @IsNotEmpty()
  readonly id: number;
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly content: string;
  @IsNotEmpty()
  readonly status: BoardStatus;
  @IsNotEmpty()
  readonly username: string;

  constructor(builder: ResponseBoardDtoBuilder) {
    this.id = builder.id;
    this.title = builder.title;
    this.content = builder.content;
    this.status = builder.status;
    this.username = builder.username;
  }

  static builder(): ResponseBoardDtoBuilder {
    return new ResponseBoardDtoBuilder();
  }
}

  export class ResponseBoardDtoBuilder{
    id: number;
    title: string;
    content: string;
    status: BoardStatus;
    username: string;

    withId(id: number): ResponseBoardDtoBuilder {
      this.id = id;
      return this;
    }

    withTitle(title: string): ResponseBoardDtoBuilder {
      this.title = title;
      return this;
    }

    withContent(content: string): ResponseBoardDtoBuilder {
      this.content = content;
      return this;
    }

    withStatus(status: BoardStatus): ResponseBoardDtoBuilder {
      this.status = status;
      return this;
    }

    withUsername(username: string): ResponseBoardDtoBuilder {
      this.username = username;
      return this;
    }

    build(): ResponseBoardDto {
      return new ResponseBoardDto(this);
    }

}
