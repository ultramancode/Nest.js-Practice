import { PassportStrategy } from "@nestjs/passport";
import { strategies } from "passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../user.repository";
import { User } from "../user.entity";

import * as config from 'config';
const jwtConfig = config.get('jwt')
//다른 곳에 주입해서 써야하니 인젝터블
@Injectable()
//passport-jwt 임포트. 기본전략 jwt로 설정했었으니
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
    super({
      //토큰 유효 체크
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret /*config.get('jwt.secret')*/,
      //토큰 가져오는 곳
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload) {
    const {username} = payload;
    const user: User = await this.userRepository.findOneBy({username})

    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}