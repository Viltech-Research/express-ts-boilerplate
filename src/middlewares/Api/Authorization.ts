/**
 * 
 * @author Viltech
 */

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import Locals from "../../providers/Locals";

class Authorization {
    public static getToken (req: Request): string {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			return req.headers.authorization.split(' ')[1];
		} else if (req.query && req.query.token) {
			return `${req.query.token}`;
		}

		return '';
	}

    public async verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = Authorization.getToken(req);
        if(token == '') {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        jwt.verify(token, Locals.config().appSecret, (err: any) => {
            if(err) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
            next();
        })
        
    }
}

export default new Authorization;