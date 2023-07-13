import { IsString, Matches, Max, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly username: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  //영어,숫자만
  @Matches(/^[a-zA-Z0-9]*$/, {
   message: '비밀번호는 영문 및 숫자만 입력 가능합니다.'
  })
  readonly password: string;
}