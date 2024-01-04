/**
 * 
 * @author Viltech
 */

import * as kue from 'kue';
import * as path from 'path';
import * as dotenv from 'dotenv';

import Express from './Express';
import Database from './Database';
import Queue from './Queue';
import Locals from './Locals';
import Log from '../middlewares/Log';

class App {
    // clear the console
    public clearConsole(): void {
        process.stdout.write('\x1B[2J\x1B[0f');

        Queue.dispatch('checkout', { foo: 'bar', fizz: 'buzz'}, (data: any) => {
            console.log('>> here is the data', data);
        })
    }

    // Loads your dotenv file
    public loadConfiguration(): void {
        Log.info('Configuration :: Booting @ Master...');

        dotenv.config({ path: path.join(__dirname, '../../.env') });
    }

    // Loads your Server
    public loadServer(): void {
        Log.info('Server :: Booting @ Master...');

        Express.init();
    }

    // Loads the Database Pool
    public loadDatabase(): void {
        Log.info('Database :: Booting @ Master...');

        Database.init();
    }

    // Loads the Worker Pool
    public loadWorker(): void {
        Log.info('Worker :: Booting @ Master...');
    }
}

export default new App;