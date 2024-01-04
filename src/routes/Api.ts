/**
 * 
 * @author Viltech
 */

import { Router } from "express";
import expressJwt from 'express-jwt'; 
import { check } from "express-validator/check";

import Locals from "../providers/Locals";
import HomeController from "../controllers/Api/Home";
import LoginController from "../controllers/Api/Auth/Login";
import RegisterController from "../controllers/Api/Auth/Register";
import RegisterValidator from "../middlewares/Api/Validator";

const passport = require('passport');

import Authorization from "../middlewares/Api/Authorization";

const router = Router();

router.get('/', HomeController.index);
router.get('/testAuth', Authorization.verifyToken, HomeController.index);

router.post('/auth/login', HomeController.index);
router.post('/auth/login/password', passport.authenticate('local'), HomeController.index);
router.post('/auth/register', RegisterValidator, RegisterController.perform);
// could pose problems later
// router.post('/auth/refresh-token', expressJwt({ secret: Locals.config().appSecret }), RefreshTokenController.perform);

export default router;