import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "../boards/boards.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserRepository extends Repository<User>{

  // constructor(@InjectRepository(User) private readonly repository: Repository<User>){
  //   super(repository.target, repository.manager, repository.queryRunner);
  // }
  // constructor(private readonly  datasource: DataSource) {
  //   super(User, datasource.createEntityManager());
  // }
  constructor(private readonly  datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User>{
    const{username, password} = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword
    });
    try {
      await this.save(user);
    }
    //추후 exist로 확인 후 처리하는 걸로 예외 처리하자~
    catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 유저네임입니다.')
      } else {
        throw new InternalServerErrorException()
      }
      //23505 코드로 에러나는거 확인..
      // console.log('error', error );
    }
    return user;
  }


}