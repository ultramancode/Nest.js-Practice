import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeormConfig } from "./common/configs/typeorm.config";
import { AuthModule } from './auth/auth.module';
import { APP_FILTER} from "@nestjs/core";
import { httpExceptionFilter } from "./common/filter/http-exception.filter";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    BoardsModule,
    AuthModule
  ],
  providers:[
    {
      provide : APP_FILTER,
      useClass : httpExceptionFilter,
    },
  ],
})
export class AppModule {}
