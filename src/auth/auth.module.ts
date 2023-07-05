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

@Module({
  imports: [
  TypeOrmModule.forFeature([User]),
    //패스포트에서 jwt 사용할거니까
  PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.register({
    secret: 'Secret1234',
    signOptions:{
      expiresIn: 60 * 60,
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  //다른 모듈에서 사용하려면 exports
  exports: [JwtStrategy, PassportModule]

})
export class AuthModule {
}
