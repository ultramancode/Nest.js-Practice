import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";
import * as config from 'config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //최상위에 있는 default.yml 파일에서 server: 을 가져오는 것
  const serverConfig = config.get('server');
  //마찬가지로 server: 밑에 있는 port: 가져오는 것
  const port = serverConfig.port;
  await app.listen(port);
  Logger.log(`${port}번 포트로 실행중입니다`)

}
bootstrap();
