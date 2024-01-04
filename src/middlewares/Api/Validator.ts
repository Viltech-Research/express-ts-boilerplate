/**
 * 
 * @author Viltech
 */

import { check } from "express-validator/check";

const RegisterValidator = [
    check('email')
        .isEmail(),
    check('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
]

export default RegisterValidator;