/**
 * 
 *  @author Viltech
 */

const passport = require('passport');
const LocalStrategy = require('passport-local')
import * as crypto from 'crypto';

import User from '../../models/User';
import Log from '../../middlewares/Log';
import { IUserModel } from '../../models/User';

class Locals {
    public static init (_passport: any): any {
        _passport.use(new LocalStrategy(function verify(_email: string, _password: string, done: any) {
            User.findOne({ email: _email})
                .then((_user: IUserModel | null) => {
                    if(!_user) { 
                        return done(null, false, { message: 'Incorrect email or password.' }); 
                    }

                    crypto.pbkdf2(_password, _user.salt, 310000, 32, 'sha256', (err: any, hashedPassword: any) => {
                        if(err) {
                            return done(err);
                        }

                        if(crypto.timingSafeEqual(Buffer.from(_user.password), hashedPassword)) {
                            return done(null, false, { message: 'Incorrect email or password.' });
                        }
                        
                        return done(null, _user)
                    })
                })
        }))
    }
}

export default Locals;