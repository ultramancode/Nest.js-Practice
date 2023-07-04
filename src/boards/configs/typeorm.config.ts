import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '2172',
  database: 'board-app',
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
};
