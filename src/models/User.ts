/**
 * 
 * @author Viltech
 */

import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

import { IUser } from '../interfaces/models/user';


export interface IUserModel extends IUser, mongoose.Document {
    comparePassword: (password: string, cb: any) => string;
    validPassword: (password: string, cb: any) => string;
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

// Password hash middleware.
UserSchema.pre<IUserModel>('save', function (_next) {
    const user = this;
    if(!user.isModified('password')) {
        return _next();
    }

    bcrypt.genSalt(10, (_err: Error | undefined, _salt: string) => {
        if(_err) {
            return _next(_err);
        }

        bcrypt.hash(user.password, _salt)
            .then((_hash: string) => {
                user.password = _hash;
                return _next();
            })
            .catch((_err: Error) => {
                return _next(_err);
            });
    })
})

// Custom Methods
// Compares the user's password with the request password
UserSchema.methods.comparePassword = function(_requestPassword: string, _cb: any): any {
    bcrypt.compare(_requestPassword, this.password, (_err: Error | undefined, _isMatch: boolean) => {
        return _cb(_err, _isMatch);
    })
}

// Validates the password
UserSchema.methods.validPassword = function(_password: string, _cb: any): any {
    return _password === this.password;
}


export const User = mongoose.model<IUserModel>('User', UserSchema);

export default User;