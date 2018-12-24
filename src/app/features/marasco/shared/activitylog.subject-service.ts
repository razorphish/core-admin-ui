import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import * as moment from 'moment';

@Injectable()
export class ActivityLogSubjectService {
  public store: any = {
    errors: [],
    updates: [],
    gets: [],
    inserts: [],
    lastUpdated: ''
  };

  private subject;
  private _activityLogName = 'activityLog';

  constructor() {
    this.subject = new Subject();
    this.activate();
  }

  activate() {
    const store = localStorage.getItem(this._activityLogName);

    if (store) {
      this.store = JSON.parse(store);
    } else {
      this.store.lastUpdated = moment();
      this.store.gets.push('Init Get');
      this.setActivityLog(this.store);
    }

    this.subject.next(this.store);
  }

  subscribe(next, error?, complete?) {
    this.subject.subscribe(next, error, complete);
  }

  addError(error) {
    this.store.errors.push(error);
    this.store.lastUpdated = moment();
    this.setActivityLog(this.store);
    this.subject.next(this.store);
  }

  addUpdate(updateMessage: string) {
    this.store.updates.push(updateMessage);
    this.store.lastUpdated = moment();
    this.setActivityLog(this.store);
    this.subject.next(this.store);
  }

  addGet(getMessage: string) {
    this.store.gets.push(getMessage);
    this.store.lastUpdated = moment();
    this.setActivityLog(this.store);
    this.subject.next(this.store);
  }

  addInserts(insertMessage: string) {
    this.store.inserts.push(insertMessage);
    this.store.lastUpdated = moment();
    this.setActivityLog(this.store);
    this.subject.next(this.store);
  }

  refresh() {
    this.store = {
      errors: [],
      updates: [],
      gets: [],
      inserts: [],
      lastUpdated: ''
    };

    this.setActivityLog(this.store);
    this.subject.next(this.store);
  }

  private setActivityLog(store) {
    localStorage.setItem(this._activityLogName, JSON.stringify(store));
  }
}
