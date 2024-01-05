/**
 * 
 * @author Viltech
 */

import { Application } from "express";

import CORS from './CORS';
import Http from "./Http";
import Locals from "../providers/Locals";

class Kernel {
    public static init(_express: Application): Application {
        // Mount basic express api middleware
        _express = Http.mount(_express);

        // check if CORS is enabled
        if(Locals.config().isCORSEnabled) {
            // Mount CORS
            _express = CORS.mount(_express);
        }

        return _express;
    }
}

export default Kernel;