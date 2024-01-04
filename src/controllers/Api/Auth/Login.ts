/**
 * 
 * @author Viltech
 */

import * as jwt from 'jsonwebtoken';

import User, { IUserModel } from '../../../models/User';
import { Request, Response } from 'express';
import { MongooseError } from 'mongoose';
import { check, validationResult } from 'express-validator/check';
import Locals from '../../../providers/Locals';

class LoginController {
    public static async perform(req: Request, res: Response): Promise<any> {
        check('email')
            .not().isEmpty().withMessage('Email cannot be blank')
            .not().isEmail().withMessage('Email is not valid')
            .normalizeEmail({ gmail_remove_dots: false })
        check('password')
            .not().isEmpty().withMessage('Password cannot be blank')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const _email = req.body.email.toLowerCase();
        const _password = req.body.password;

        User.findOne({ email: _email })
            .then((user: IUserModel| null) => {
                if(!user) { return res.status(404).json({ msg: 'User not found' }); }
                if(!user.password) { return res.status(401).json({ msg: 'Invalid credentials' }); }

                user.comparePassword(_password, (err: Error, isMatch: boolean) => {
                    if(err) { return res.status(400).json(err); }
                    if(!isMatch) { return res.status(401).json({ msg: 'Invalid credentials' }); }

                    const token = jwt.sign(
                        { email: _email, password: _password },
                        Locals.config().appSecret,
                        { expiresIn: Locals.config().jwtExpiresIn * 60 }
                    );

                    const refreshToken = jwt.sign(
                        { email: _email, password: _password },
                        Locals.config().refreshSecret,
                        { expiresIn: Locals.config().jwtExpiresIn * 60 }
                    )

                    // Save token
                    user.tokens.push({ kind: 'jwt', accessToken: token }, { kind: 'refresh', accessToken: refreshToken });
                    user.save();

                    // Set cookie
                    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: Locals.config().jwtExpiresIn * 60 * 1000 })

                    return res.json({
                        token,
                        token_expires_in: Locals.config().jwtExpiresIn * 60
                    })
                })
            })
    }
}

export default LoginController;