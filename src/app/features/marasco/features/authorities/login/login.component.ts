import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Third Party Services
import { NotificationService } from '../../../shared/utils/notification.service';

import { AuthoritiesService } from '../../authorities/';

@Component({
  selector: 'marasco-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  @ViewChild('loginForm') loginForm;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _authoritiesService: AuthoritiesService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit() {
    // reset login status
    this._authoritiesService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this._authoritiesService.lastUrl;
  }

  login() {
    this.loading = true;
    this._authoritiesService
      .login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.loading = false;
          this._router.navigate([this.returnUrl]);
        },
        error => {
          this._notificationService.bigBox({
            title: 'Invalid Credentials',
            content: 'The username and/or password is incorrect.  Please try again',
            color: '#C46A69',
            icon: 'fa fa-warning shake animated',
            // number: '1',
            timeout: 6000 // 6 seconds
          });
          this.loading = false;
        }
      );
  }
}
