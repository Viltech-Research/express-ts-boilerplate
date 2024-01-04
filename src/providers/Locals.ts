/**
 * 
 * @author Viltech
 */

import { Application } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
    /**
	 * Makes env configs available for your app
	 * throughout the app's runtime
	 */
    public static config(): any {
        dotenv.config({ path: path.join(__dirname, '../../.env') });

        const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
        const port = process.env.PORT || 3000;
        const appSecret = process.env.APP_SECRET || 'secret';
        const refreshSecret = process.env.REFRESH_SECRET || 'refresh_secret';
        const mongooseUrl = process.env.MONGOOSE_URL || 'mongodb://localhost:27017/viltech';
        const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '10mb';
        const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || '10mb';

        const isCORSEnabled = process.env.CORS_ENABLED || true;
        const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1.21e+6';
        const jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '1.21e+6';
        const apiPrefix = process.env.API_PREFIX || 'api';

        const longDays = process.env.LONG_DAYS || 7;

        const queueMonitor = process.env.QUEUE_MONITOR || true;
        const queueMonitorHttpPort = process.env.QUEUE_MONITOR_HTTP_PORT || 3001;

        const mongoHttpPort = process.env.MONGO_HTTP_PORT || 27017;
        const mongoHttpHost = process.env.MONGO_HTTP_HOST || 'localhost';
        const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/viltech';

        const prefix = process.env.QUEUE_PREFIX || 'q';

        const googleId = process.env.GOOGLE_ID || '';
        const googleSecret = process.env.GOOGLE_SECRET || '';

        return {
            appSecret,
            refreshSecret,
            jwtExpiresIn,
            jwtRefreshExpiresIn,
            mongooseUrl,
            isCORSEnabled,
            apiPrefix,
            url,
            port,
            maxUploadLimit,
            maxParameterLimit,
            longDays,
            queueMonitor,
            queueMonitorHttpPort,
            mongoHttpPort,
            mongoHttpHost,
            mongoUrl,
        };
    }

    /**
     * Injects your config to the app's locals
     */
    public static init(_express: Application): Application {
        _express.locals.app = this.config();
        return _express;
    }
}

export default Locals;