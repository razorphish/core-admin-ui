import { Component, OnInit, ViewChild } from '@angular/core';

import { NotificationService } from '../../../shared/utils/notification.service';

import * as moment from 'moment';

@Component({
  selector: 'marasco-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //////////////////Privately exposed variables///////////

  //////////////////Publicly exposed variables///////////
  public user: any;
  public today = moment().format('dddd, MMMM Do YYYY');

  @ViewChild('myProfileForm') myProfileForm;

  constructor(private _notificationService: NotificationService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).user;
  }
}
