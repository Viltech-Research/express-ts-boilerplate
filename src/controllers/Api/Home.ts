/**
 * 
 * @author Viltech
 */

import Locals from "../../providers/Locals";
import { Request, Response, NextFunction } from "express";

class HomeController {
    public static index(req: Request, res: Response, next: NextFunction): any {
        if(!req.user) {
            return res.json({
                message: 'Not logged in'
            })
        }
        return res.json({
            message: new Date()
        })
    }
}

export default HomeController;