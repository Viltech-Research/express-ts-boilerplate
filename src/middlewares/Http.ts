/**
 * 
 * @author Viltech
 */

import cors from 'cors';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import expressValidator from 'express-validator';
const session = require('express-session');

import Log from './Log';
import Locals from '../providers/Locals';
import Passport from '../providers/Passport';

import MongoStore from 'connect-mongo';

class Http {
    public static mount(_express: Application): Application {
        Log.info('Booting the \'HTTP\' middleware...');

        // Enables the body parser
        _express.use(bodyParser.json());

        _express.use(bodyParser.urlencoded({ extended: true }));

        // Disable the x-powered-by header in response
        _express.disable('x-powered-by');

        // Enables the request payload validator
        _express.use(expressValidator());

        /**
         * Enables the session store
         */

        const option = {
            resave: true,
            saveUninitialized: true,
            secret: Locals.config().appSecret,
            cookie: {
                maxAge: 1209600000 // two weeks (in ms)
            },
            store: MongoStore.create({
                mongoUrl: Locals.config().mongooseUrl
            })
        };

        _express.use(session(option));

        // Enables CORS
        _express.use(cors());

        // Loads the passport configuration
        _express = Passport.mountPackage(_express);

        return _express;
    }
}

export default Http;