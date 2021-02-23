import { from } from "rxjs";
import {Document} from 'mongoose'

export interface Users extends Document{
     _doc: any;
     token: any;
     firstname:string,
     lastname:string,
     email:string,
     dob:string,
     password:string,
     role:string,
     gender:string,
     createdAt:Date,
     updatedAt:Date,
     profilepic:string,
     joindate:string,
     status:string,
}