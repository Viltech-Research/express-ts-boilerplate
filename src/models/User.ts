/**
 * 
 * @author Viltech
 */

import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

import { IUser } from '../interfaces/models/user';


export interface IUserModel extends IUser, mongoose.Document {
    comparePassword(password: string, cb: any): string;
}

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

// Compares the user's password with the request password
UserSchema.methods.comparePassword = function (_requestPassword: string, _cb: any): any {
	bcrypt.compare(_requestPassword, this.password, (_err, _isMatch) => {
		return _cb(_err, _isMatch);
	});
};


export const User = mongoose.model<IUserModel>('User', UserSchema);

export default User;