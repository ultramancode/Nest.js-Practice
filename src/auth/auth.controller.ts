import { Body, Controller, Post, Req, Res, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { User } from "./user.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../common/decorator/getUser.decorator";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    return this.authService.signIn(authCredentialsDto);

  }

  @Post('/authtest')
  //이걸 해줘야 일단 리퀘스트 객체 안에 유저 객체가 들어가니까 먼저 하고
  @UseGuards(AuthGuard())
  // test(@Req() req) {
  //   console.log('user', req.user)
  // 커스텀 데코레이터 사용해서 바로 user 가져오기
  test(@GetUser() user: User) {
    console.log('user', user)
  }




}
