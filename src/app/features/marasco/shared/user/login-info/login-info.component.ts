import {Component, OnInit} from '@angular/core';
import { UserService } from "@app/features/marasco/core/services/user.service";
import { LayoutService } from '@app/features/marasco/core/services/layout.service';

@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {


  constructor(
    public us: UserService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
  }

  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}
