import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create < NestExpressApplication>(AppModule);
  await app.listen(process.env.PORT || 3000,function(){
    console.log('process.env.PORT :>> ', process.env.PORT);
    console.log("Express server listening on port %d in mode", this.address().port);
});

}
bootstrap();
