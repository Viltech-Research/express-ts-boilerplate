/**
 * 
 * @author Viltech
 */

import { Request, Response, NextFunction } from "express";

class LogoutController {
    public static perform(req: Request, res: Response, next: NextFunction): any {
        req.logout((err: any) => {
            if(err) {
                return next(err);
            }
            return res.json({
                message: 'Logged out'
            })
        })
    }
}

export default LogoutController;