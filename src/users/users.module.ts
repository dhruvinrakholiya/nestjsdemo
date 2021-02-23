import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { userSchema } from '../auth/Schema/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([{ name: 'users', schema: userSchema, collection: 'users' },]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule { }
