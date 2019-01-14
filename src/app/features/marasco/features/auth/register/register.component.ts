import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Store } from '@ngrx/store';
import * as fromAuth from '@app/features/marasco/core/store/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public model= {
    _id: '',
    avatar: '',
    dateCreated: new Date,
    email: '',
    firstName: '',
    lastName: '',
    homePhone: '',
    username: 'test',
    password: '',
    confirmPassword: '',
    salt: ''
  };


  public validationOptions:any = {

    // Rules for form validation
    rules: {
      username: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 3,
        maxlength: 20
      },
      passwordConfirm: {
        required: true,
        minlength: 3,
        maxlength: 20,
        equalTo: '#password'
      },
      firstname: {
        required: true
      },
      lastname: {
        required: true
      },
      terms: {
        required: true
      }
    },

    // Messages for form validation
    messages: {
      login: {
        required: 'Please enter your login'
      },
      email: {
        required: 'Please enter your email address',
        email: 'Please enter a VALID email address'
      },
      password: {
        required: 'Please enter your password'
      },
      passwordConfirm: {
        required: 'Please enter your password one more time',
        equalTo: 'Please enter the same password as above'
      },
      firstname: {
        required: 'Please select your first name'
      },
      lastname: {
        required: 'Please select your last name'
      },
      terms: {
        required: 'You must agree with Terms and Conditions'
      }
    },
    submitHandler: this.register

  };

  bsModalRef: BsModalRef;
  //public termsAgreed = false

  constructor(
    private _store: Store<any>,
    private modalService: BsModalService) {

  }

  ngOnInit() { }

  // register(event) {
  //   event.preventDefault();
  //   this.router.navigate(['/dashboard'])
  // }

  register() {
    console.log('register');
    console.log(this.model.username);
  }

  openModal(event, template: TemplateRef<any>) {
    event.preventDefault();
    this.bsModalRef = this.modalService.show(template);
  }

  onTermsAgree() {
    //this.termsAgreed.value = true
    this.bsModalRef.hide()
  }

  onTermsClose() {
    this.bsModalRef.hide()
  }
}
