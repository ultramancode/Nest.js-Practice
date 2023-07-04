import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { User } from "./user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    ) {
  }

  signUp(authCredentialsDto :AuthCredentialsDto): Promise<User>{
    return this.userRepository.createUser(authCredentialsDto);
  }
}