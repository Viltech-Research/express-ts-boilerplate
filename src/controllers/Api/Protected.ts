/**
 * 
 * @author Viltech
 */

import Locals from "../../providers/Locals";
import { Request, Response, NextFunction } from "express";

class HomeController {
    public static index(req: Request, res: Response, next: NextFunction): any {
        return res.json({
            message: Locals.config().name
        })
    }
}

export default HomeController;