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
        passport.use(new LocalStrategy((username: string, password: string, done: any) => {
            User.findOne({ email: username})
                .then((_user: IUserModel | null) => {
                    if(!_user) { 
                        return done(null, false, { message: 'Incorrect email or password.' }); 
                    }
                    crypto.pbkdf2(password, _user.salt, 310000, 64, 'sha256', (err: any, hashedPassword: any) => {
                        if(err) {
                            return done(err);
                        }
                        const _hashedString = hashedPassword.toString('hex');

                        if(crypto.timingSafeEqual(Buffer.from(_user.password), Buffer.from(_hashedString))) {
                            return done(null, false, { message: 'Incorrect email or password.' });
                        }
                        return done(null, _user)
                    })
                })
                .catch((err: any) => {
                    Log.error(err);
                    return done(err);
                })
        }))
    }
}

export default Locals;