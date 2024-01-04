/**
 * 
 * @author Viltech
 */

import Log from "../middlewares/Log";
import Locals from "../providers/Locals";
import { Application, Request, Response } from "express";

class ExceptionHandler {
    /**
     * Handles all not found routes 
     */   
    public notFoundHandler(_express: Application): Application {
        const apiPrefix = Locals.config().apiPrefix;

        _express.use('*', (req: Request, res: Response) => {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            Log.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`);
            if(req.xhr || req.originalUrl.includes(`/${apiPrefix}`)) {
                return res.json({
                    error: 'Path not found'
                });
            } else {
                res.status(404);
                return res.json({
                    error: 'Path not found'
                })
            }
        })

        return _express;
    }

    /**
     * Handles your api/web routes errors/exceptions
     */
    public clientErrorHandler(err: any, req: Request, res: Response, next: any): any {
        Log.error(err.stack);

        if(req.xhr) {
            return res.status(500).send({ error: 'Something went wrong!'});
        } else {
            return next(err);
        }
    }

    /**
     * Register your error / exception monitoring
     * tools right here ie. before the last app.use()
     */
    public logErrors(err: any, req: Request, res: Response, next: any): any {
        Log.error(err.stack);
        return next(err);
    }
}

export default new ExceptionHandler;