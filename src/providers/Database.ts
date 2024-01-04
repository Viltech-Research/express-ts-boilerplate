/**
 * 
 * @author Viltech
 */

import mongoose, { MongooseError } from "mongoose";
import bluebird from "bluebird";

import Locals from "./Locals";
import Log from "../middlewares/Log";

class Database {
    // Initializes the Database Pool
    public init(): void {
        const dsn = Locals.config().mongooseUrl;

        (<any>mongoose).Promise = bluebird;

        mongoose.connect(dsn)
            .then(() => {
                Log.info('connected to mongo server at: ' + dsn);
            }).catch((error: MongooseError) => {
                Log.info('Failed to connect to the Mongo server!!');
                console.log(error);
                throw error;
            })
    }
}

export default new Database;