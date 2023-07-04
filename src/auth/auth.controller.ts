import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { User } from "./user.entity";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signUp(authCredentialsDto);
  }




}
