import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../../src/auth/auth.module';
import { AuthService } from '../../src/auth/auth.service';
import { userSchema } from '../../src/auth/Schema/users.schema';
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
