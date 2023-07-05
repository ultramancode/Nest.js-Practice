import { Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    ) {
  }

  async signUp(authCredentialsDto :AuthCredentialsDto): Promise<User>{
    return this.userRepository.createUser(authCredentialsDto);
  }

  //포스트맨에서 raw에서 json형태로 안되고 x-www-form으로 해야하네..? 흠..
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const {username, password} = authCredentialsDto;
    const user = await this.userRepository.findOneBy({username});
    //유저가 있는지 확인 및 비번~
    if(user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('로그인 실패')
    }
  }


}