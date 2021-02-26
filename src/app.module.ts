import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from "@nestjs/mongoose";
import { config } from 'dotenv';

config();
@Module({
  imports: [UsersModule, AuthModule,
    MongooseModule.forRoot(process.env.MONGODBURL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  
}
