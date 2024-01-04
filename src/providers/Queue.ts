/**
 * 
 * @author Viltech
 */

import * as kue from 'kue';

import Locals from '../services/strategies/Local';
import Log from '../middlewares/Log';

class Queue {
    public jobs: any;

    constructor() {
        this.jobs = kue.createQueue();

        this.jobs
            .on('job enqueue', (_id: number, _type: any) => Log.info(`Job ${_id} got queued of type ${_type}`))
            .on('job complete', (_id: number, _result: any) => this.removeProcessedJob(_id));
    }

    public dispatch(_jobName: string, _args: object, _callback: Function): void {
        this.jobs.create(_jobName, _args).save();

        this.process(_jobName, 3, _callback);
    }

    private removeProcessedJob(_id: number): void {
        Log.info(`Job ${_id} Processed`);

        kue.Job.get(_id, (_err: any, _job: any) => {
            if(_err) return;

            _job.remove((_err: any) => {
                if(_err) throw _err;
                Log.info(`Removed completed job ${_job.id}`);
            })
        })
    }

    private process(_jobName: string, _count: number, _callback: Function): void {
        this.jobs.process(_jobName, _count, (_job: any, _done: any) => {
            _done(); // Notifies Kue about the completion of the job

            _callback(_job.data);
        })
    }
}

export default new Queue;