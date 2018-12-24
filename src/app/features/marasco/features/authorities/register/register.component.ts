import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserService, IUser } from '../../account/users';
import { AlertService } from '../shared';

@Component({
  selector: 'marasco-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: IUser = {
    _id: '',
    avatar: '',
    dateCreated: new Date,
    email: '',
    firstName: '',
    lastName: '',
    homePhone: '',
    username: '',
    password: '',
    confirmPassword: '',
    salt: ''
  };

  loading = false;
  @ViewChild('registerForm') registerForm;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

      register(form: any) {
        this.loading = true;
        this.userService.insert(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
