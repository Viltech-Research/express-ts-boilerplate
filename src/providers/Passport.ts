/**
 * 
 * @author Viltech
 */

import { Application } from "express";
const passport = require('passport');

import LocalStrategy from '../services/strategies/Local';
import Log from '../middlewares/Log';

class Passport {
    public mountPackage(_express: Application): Application {
        _express = _express.use(passport.initialize());
        _express = _express.use(passport.session());

        passport.serializeUser((_user: any, done: any) => {
            process.nextTick(() => {
                done(null, { email: _user.email, password: _user.password })
            })
        });

        passport.deserializeUser((_user: any, done: any) => {
            process.nextTick(() => {
                done(null, _user)
            }) 
        });

        this.mountLocalStrategies();

        return _express;
    }

    public mountLocalStrategies(): void {
        try {
            LocalStrategy.init(passport);
        } catch (_err) {
            Log.error(String(_err));
        }
    }
}

export default new Passport;