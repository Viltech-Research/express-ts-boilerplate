/**
 * 
 * @author Viltech
 */

import express from 'express';

import Locals from './Locals';
import Routes from './Routes';
import ExceptionHandler from '../exception/Handler';
import Kernel from '../middlewares/Kernel';

class Express {
    /**
     * Create the express object
     */
    public express: express.Application;
    
    /**
     * Initializes the express server
     */
    constructor() {
        this.express = express();

        this.mountDotEnv();
        this.mountMiddleware();
        this.mountRoutes();
    }

    /**
     * Mounts the dotenv
     */
    private mountDotEnv(): void {
        this.express = Locals.init(this.express);
    }

    /**
     * Mounts the middleware
     */
    private mountMiddleware(): void {
        this.express = Kernel.init(this.express);
    }


    /**
     * Mount all routes
     */
    private mountRoutes(): void {
        this.express = Routes.mountApi(this.express);
    }


    public init(): any {
        const port: number = Locals.config().port;

        // Registering Exception / Error Handlers
        this.express.use(ExceptionHandler.logErrors);
        this.express.use(ExceptionHandler.clientErrorHandler);
        this.express = ExceptionHandler.notFoundHandler(this.express);

        // Start the server on the specified port
        this.express.listen(port, () => {
            return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${port}'`);
        }).on('error', (_err) => {
            return console.log('Error: ', _err.message);
        })
    }
}

export default new Express();