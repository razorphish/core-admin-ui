import { Execution } from './Execution.interface';

export interface Job {
    _id?: string;
    parentJobId?: string;
    userId?: any;

    /**
     * @description Activity status
     * @type {string}
     * @example: ready|running|paused|fail|terminated|restarted|executed|completed
     * @memberof Job
     */
    activityStatusId?: string;
    execution?: Execution;
    meta?: string;
    name?: string;
    normalizedName?: string;

    /**
     * @description Status
     * @type {string}
     * @memberof Job
     * @example active|inactive|disabled|pending|archived|suspended|deleted
     */
    statusId?: string;

    dateModified?: Date;
    dateCreated?: Date;
}
