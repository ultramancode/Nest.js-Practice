import { IsNotEmpty } from "class-validator";

export class UpdateBoardDto {
  //대문자 I로 시작하는 데코레이터.. ()까지..
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  readonly content: string;
}
