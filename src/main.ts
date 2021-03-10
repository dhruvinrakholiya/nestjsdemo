import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as fs from "fs";
import { join } from "path";
import { ValidationPipe } from '@nestjs/common';
const cloudinary = require('cloudinary').v2;
config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  console.log('process.env.PORT :>> ', process.env.PORT);
  await app.listen(process.env.PORT || 3000, function () {
    console.log('process.env.PORT :>> ', process.env.PORT);
    console.log("Express server listening on port %d in mode", this.address().port);
  });
  async function createFolder() {
    let dir = './upload';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  await createFolder();
  app.useStaticAssets(join(__dirname, '../upload'));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
}

bootstrap();
