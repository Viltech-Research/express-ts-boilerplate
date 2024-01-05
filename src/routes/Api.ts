/**
 * 
 * @author Viltech
 */

import { Router } from "express";
import passport from 'passport';

import HomeController from "../controllers/Api/Home";
import RegisterController from "../controllers/Api/Auth/Register";
import LogoutController from "../controllers/Api/Auth/Logout";

const router = Router();

router.get('/', HomeController.index);

router.post('/auth/login', passport.authenticate('local'), HomeController.index);
router.post('/auth/register', RegisterController.perform);
router.post('/auth/logout', LogoutController.perform);

export default router;