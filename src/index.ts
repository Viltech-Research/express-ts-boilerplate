/**
 * 
 * @author Viltech
 */

import * as os from 'os';
import cluster from 'cluster';

import App from './providers/App';
import NativeEvents from './exception/NativeEvents';

if (cluster.isPrimary) {
    /**
     * Catches process events
     * 
     */
    NativeEvents.process();

    /**
     * Clear the console before the app loads
     */
    App.clearConsole();

    /**
     * load configurations
     */
    App.loadConfiguration();

    /**
     * Find the available CPUs and fork the process
     */
    const CPUS: number = os.cpus().length;

    for (let i = 0; i < CPUS; i++) {
        cluster.fork();
    }

    /**
     * Catch cluster events
     */
    NativeEvents.cluster(cluster);

    /**
     * Load queue Monitor if enabled
     */
    // App.loadQueue();


    /**
	 * Run the Worker every minute
	 * Note: we normally start worker after
	 * the entire app is loaded
	 */
    setTimeout(() => App.loadWorker(), 1000 * 60)
} else {
    /**
     * Run the database pool
     */
    App.loadDatabase();

    /**
     * Run the servers on clusters
     */
    App.loadServer();
}