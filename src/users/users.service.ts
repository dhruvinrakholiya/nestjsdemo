import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from "express";
import { Model } from 'mongoose';
import { Users } from 'src/auth/interface/users.interface';


@Injectable()
export class UsersService {
    constructor(@InjectModel('users') private usersModel: Model<Users>,) { }

    //Add User
    async createUser(req: Request, res: Response) {
        try {
            let userData = req.body
            // Check Email
            const userObject = await this.usersModel.findOne({ email: userData.email })
            if (userObject) throw new Error('User Already Exist')

            const createUserObject = await this.usersModel.create(userData)
            return res.status(200).json({ statusCode: 500, message: 'Create User Successfully', data: createUserObject })
        } catch (error) {
            return res.status(200).json({ statusCode: 500, message: error.message, data: null })
        }
    }

    //Edit User
    async editUsers(req: Request, res: Response) {
        try {
            const userId = req.params.id
            let userData = req.body
            const userObject = await this.usersModel.findOneAndUpdate({ _id: userId }, { $set: userData }, { new: true })
            if (!userObject) throw new Error('User not Found')

            return res.status(200).json({ statusCode: 500, message: 'Update User Successfully', data: userObject })
        } catch (error) {
            return res.status(200).json({ statusCode: 500, message: error.message, data: null })
        }
    }

    //Search Data
    async searchData(req:Request,res:Response){
        try {
            let page: any = req.query.page
            let perPage: any = req.query.perPage
            let {search,role}: any = req.body
            

            if (page == 0) throw new Error('page is Zero')
            if (perPage == 0) throw new Error('perPage is Zero')
            if (typeof page !== 'number' && typeof perPage !== 'number') {
                page = Number(page);
                perPage = Number(perPage)
            }
            const qryObject = {
                $or:[
                    { first_name:{$regex:`^${search}`,$options:'i'} },
                    { last_name:{$regex:`^${search}`,$options:'i'} },
                    { role:{$regex:`^${role}`,$options:'i'} }
                ]
            }//{ first_name: { $regex: `^${firstName}`, $options: 'i' } }
            const totalData = await this.usersModel.find(qryObject).countDocuments();
            const orderList = await this.usersModel.find(qryObject).skip(perPage * (page - 1)).limit(perPage)

            let totalPages: any = Math.ceil(totalData / perPage)
            let currentPage: any = page
            if (currentPage > totalPages) throw new Error("Page not Found")

            return res.json({ "status": 200, message: "SuccessFully Search", "Data": orderList, totalData, totalPages, currentPage })
        } catch (error) {
            return res.json({ "status": 500, message: error.message, "Data": null })
        }
    }
}
