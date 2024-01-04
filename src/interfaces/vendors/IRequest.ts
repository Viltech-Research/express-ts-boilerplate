/**
 * 
 * @author Viltech
 */

import { Request } from "express";
import { IJwt } from "./IJwt";

export interface IRequest extends Request {
    user: IJwt;
}