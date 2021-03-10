import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from "express";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./interface/users.interface";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

const saltRounds = 10;

@Injectable()
export class AuthService {
    constructor(@InjectModel('users') private usersModel: Model<Users>, private jwtService: JwtService) { }
    async createUser(req: Request, res: Response) {
        try {
            let userData = req.body
            if (!(userData.role === 'Management' || userData.role === 'Project Manager')) {
                throw new UnauthorizedException('Unauthorized user')
            }
            // Check Email
            const emailExist = await this.usersModel.findOne({ email: userData.email })
            if (emailExist) throw new Error('User Already Exist')

            // Encrypt
            userData.password = await bcrypt.hash(userData.password, saltRounds);
            const userObject = await this.usersModel.create(userData)
            if (userObject) {
                const userData = { ...userObject._doc };
                delete userData.password;
                delete userData.token;
                return res.json({ statusCode: 200, message: 'SignUp Successfully', data: userData });
            } else {
                return res.json({ statusCode: 400, message: 'Singup Failed', data: null });
            }
        } catch (error) {
            return res.json({ statusCode: 500, message: error.message, data: null })
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            let { email, password } = req.body
            if (!(email && password)) throw new Error("Please Enter Data");

            let userData: any = await this.usersModel.findOne({ email })
            if (!userData) throw new Error("User not Found");

            const comparePassword = await bcrypt.compare(password, userData.password)
            if (!comparePassword) {
                return res.json({ statusCode: 400, message: "Invalid Password", data: null })
            }

            const token = await this.createToken(userData.email, userData.role, userData._id)
            userData.token = token.accessToken
            await userData.save()

            return res.json({ statusCode: 200, message: "Login Success", data: { email: userData.email, _id: userData.id, token: userData.token, role: userData.role } })
        } catch (error) {
            return res.json({ statusCode: 500, message: error.message, data: null })
        }
    }

    async createToken(userEmail: String, userRole: String, userId: String) {
        const payload = { email: userEmail, role: userRole, _id: userId }
        return { accessToken: this.jwtService.sign(payload) }
    }

    async validateUser(user: any) {
        return await this.usersModel.findOne({ email: user.email })
    }

}
