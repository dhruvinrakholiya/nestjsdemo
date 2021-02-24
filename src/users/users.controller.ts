import { Body, Controller, Get, Post, Put, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/Util/role.decoretor';//src/auth/Util/role.decoretor
import { RolesGuard } from '../auth/Util/roles.guard';
import { UsersService } from './users.service';
import { SignUpForUsers } from "../auth/Validation/auth.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    //Add User 
    @Post('adduser')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('Management', 'Project Manager')
    async addUser(@Body(new ValidationPipe()) data: SignUpForUsers, @Req() req, @Res() res) {
        return await this.usersService.createUser(req, res)
    }

    //Edit User
    @Put('edituser/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('Management', 'Project Manager')
    async editUsers(@Body(new ValidationPipe()) data: SignUpForUsers, @Req() req, @Res() res) {
        return await this.usersService.editUsers(req, res)
    }

    //Search Data
    @Get('searchdata')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('Management', 'Project Manager')
    async searchData(@Req() req,@Res() res){
        return await this.usersService.searchData(req,res)
    }
}
