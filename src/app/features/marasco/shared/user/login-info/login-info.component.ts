import {Component, OnInit} from '@angular/core';
import { LayoutService } from '@app/features/marasco/core/services/layout.service';
import { AuthService } from '@app/features/marasco/core/services/auth.service';

@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {


  constructor(
    public us: AuthService,
    private layoutService: LayoutService) {
  }

  ngOnInit() {
  }

  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}
