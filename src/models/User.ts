/**
 * 
 * @author Viltech
 */

import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

import { IUser } from '../interfaces/models/user';


export interface IUserModel extends IUser, mongoose.Document {}

export const UserSchema = new mongoose.Schema<IUserModel>({
    email: { type: String, unique: true },
    password: { type: String, default: '' },
    passwordResetToken: { type: String },
    passwordResetExpires: Date,
    salt: { type: String },

    meta: { type: String },
    twitter: { type: String },
    google: { type: String },
    tokens: Array,

    fullname: { type: String },
    gender: { type: String },
    geolocation: { type: String },
}, {
    timestamps: true
});


export const User = mongoose.model<IUserModel>('User', UserSchema);

export default User;