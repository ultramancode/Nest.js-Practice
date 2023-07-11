import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";
import { UserRepository } from "./user.repository";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { register } from "tsconfig-paths";
import { JwtStrategy } from "./jwt/jwt.strategy";
import * as config from 'config';

const jwtConfig = config.get('jwt');
@Module({
  imports: [
  TypeOrmModule.forFeature([User]),
    //패스포트에서 jwt 사용할거니까
  PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.register({
    //마찬가지로 aws같은데다가 입력한 경우 먼저 거기서 가져오기
    secret: process.env.JWT_SECRET || jwtConfig.secret,
    signOptions:{
      expiresIn: jwtConfig.expiresIn,
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  //다른 모듈에서 사용하려면 exports
  exports: [JwtStrategy, PassportModule]

})
export class AuthModule {
}
