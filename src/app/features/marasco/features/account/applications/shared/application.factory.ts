import { Injectable } from '@angular/core';

import { Application } from './Application.interface';

@Injectable()
export class ApplicationFactory {
    ////////// Private variables//////////
    // private _application: Application;

    //////////Publicly exposed properties//////////

    //////////Constructor//////////
    /**
     * These should be singleton objects
     */
    constructor() { }

    public validate(application: Application, callback?: (errors: string[]) => void): boolean {
        const errors: string[] = [];

        if (!application) {
            throw new Error('Role Object Missing...');
        }

        // Check for required properties
        if (!application.name) {
            errors.push('Please enter a role name');
        }

        // Set errors
        if (errors.length > 0) {
            if (callback) {
                callback(errors);
            }
            return false;
        } else {
            return true;
        }
    }
}
