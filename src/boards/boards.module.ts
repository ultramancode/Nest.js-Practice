import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardRepository } from "./borads.repository";
import { Board } from "./boards.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    AuthModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository]})
export class BoardsModule {}
