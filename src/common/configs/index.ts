import { DataSource } from "typeorm";
import process from "process";
import { Board } from "../../boards/boards.entity";
import { User } from "../../auth/user.entity";
import * as config from "config";


const dbConfig = config.get('db')
export const AppDataSource = new DataSource({
  type: dbConfig.type,
  //로컬이 아닌 aws나 클라우드 서비스에서 데이터베이스 돌릴 때는 거기다가 넣어주니 process.~~으로 먼저 가져오는 것, 없으면 dbconfig에서
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  entities: [Board, User],
  synchronize: dbConfig.synchronize,
  // type: 'postgres',
  // host: 'localhost',
  // port: 5432,
  // username: 'postgres',
  // password: '',
  // database: 'board-app',
  // autoLoadEntities: true,
  // synchronize: true,
  // logging: true,
})
AppDataSource.initialize()
.then(() => {

})
.catch((error) => console.log(error))
