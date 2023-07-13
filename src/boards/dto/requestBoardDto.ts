import { IsNotEmpty } from 'class-validator';

export class RequestBoardDto {
  //대문자 I로 시작하는 데코레이터.. ()까지..
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly content: string;
}
