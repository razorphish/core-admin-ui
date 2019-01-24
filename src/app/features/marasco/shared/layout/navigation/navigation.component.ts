import {Component, OnInit} from '@angular/core';
import {LoginInfoComponent} from "../../user/login-info/login-info.component";


@Component({

  selector: 'sa-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  public user:any;
  constructor() {
  }

  ngOnInit() {
  }

  isInRole(role) {
    let foundRole = false;

    for (let i = 0; i < this.user.roles.length; i++) {
      if (this.user.roles[i].normalizedName === role) {
        foundRole = true;
      }
    }

    return foundRole;
  }
}
