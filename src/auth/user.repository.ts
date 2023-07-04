import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "../boards/boards.entity";

export class UserRepository extends Repository<User>{

  constructor(@InjectRepository(User) private readonly repository: Repository<User>){
    super(repository.target, repository.manager, repository.queryRunner);
  }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User>{
    const{username, password} = authCredentialsDto;
    const user = this.create({
      username,
      password
    });
    await this.save(user);
    return user;
  }


}