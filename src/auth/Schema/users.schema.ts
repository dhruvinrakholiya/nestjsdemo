import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['Management', 'Project Manager', 'Employee', 'Trainee', 'HR']
    },
    gender: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
    },
    join_date: {
        type: Date,

    },
    status: {
        type: String,
        enum: ['Current', 'Past', 'Upcoming'],
        default: 'Current'
    },
    token: {
        type: String,
        default: null,
    }

}, { timestamps: true })
// export const userSchema = SchemaFactory.createForClass(User)