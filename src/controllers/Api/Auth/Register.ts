/**
 * 
 * @author Viltech
 */

import { NextFunction, Request, Response } from "express";
import User, { IUserModel } from "../../../models/User";
import * as crypto from 'crypto';
import { validationResult } from "express-validator/check";

class RegisterController {
    public static perform(req: Request, res: Response, next: NextFunction): any {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const salt = crypto.webcrypto.getRandomValues(new Uint8Array(16));
        const _email = req.body.email.toLowerCase();
        const _password = req.body.password;
        var userExists: boolean = false;

        User.findOne({ email: _email })
            .then((user: IUserModel | null) => {
                if(user) {
                    userExists = true;
                    return res.status(400).json({
                        message: 'Email already exists'
                    })
                }

                crypto.pbkdf2(_password, salt, 310000, 64, 'sha256', (err: any, hashedPassword: any) => {
                    if(err) {
                        return next(err);
                    }
        
                    const user = new User({
                        email: _email,
                        password: hashedPassword.toString('hex'),
                        salt: salt
                    });

                    user.save()
                        .then((user: IUserModel) => {
                            req.login(user, (err: any) => {
                                if(err) {
                                    return next(err);
                                }
                                return res.status(200).json({
                                    message: 'User created',
                                    user: user
                                })
                            })
                        })
                        .catch((err) => {
                            return next(err);
                        });
                });

            })
            .catch((err: any) => {
                return next(err);
            });
            
    }
}

export default RegisterController;