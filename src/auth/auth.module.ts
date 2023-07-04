import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";
import { UserRepository } from "./user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository]
})
export class AuthModule {
}
