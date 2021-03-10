import { Body, Controller, Get, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/Util/role.decoretor';//src/auth/Util/role.decoretor
import { RolesGuard } from '../auth/Util/roles.guard';
import { UsersService } from './users.service';
import { SignUpForUsers } from "../auth/Validation/auth.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { Express } from "express";
import { fileName } from './fileUpload/file-upload';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    //Add User 
    @Post('adduser')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('Management', 'Project Manager')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                filename: fileName,
            })
        }),
    )
    async addUser(@UploadedFile() files, @Body(new ValidationPipe()) data: SignUpForUsers, @Req() req, @Res() res) {
        return await this.usersService.createUser(files, req, res)
    }

    //Edit User
    @Put('edituser/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('Management', 'Project Manager')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                filename: fileName,
            })
        }),
    )
    async editUsers(@UploadedFile() file, @Body(new ValidationPipe()) data: SignUpForUsers, @Req() req, @Res() res) {
        console.log(file);
        return await this.usersService.editUsers(file, req, res)
    }

    //Search Data
    @Post('searchdata')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('Management', 'Project Manager')
    async searchData(@Req() req, @Res() res) {
        return await this.usersService.searchData(req, res)
    }
}
