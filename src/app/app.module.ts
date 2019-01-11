import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig, LoginOpt } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';

const fbLoginOptions: LoginOpt = {
  scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
 
const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
 

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('102181083399-btfafgbina8ldqgr8tmjdqmc7gtaoji7.apps.googleusercontent.com', googleLoginOptions)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('872380819606437',fbLoginOptions)
  },
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider('LinkedIn-client-Id', false, 'en_US')
  // }
]);

export function provideConfig() {
  return config;
}

import { MarascoRoutingModule } from './features/marasco/marasco-routing.module';
import { MarascoComponent } from './features/marasco/marasco.component';
import { CoreModule } from './features/marasco/core/core.module';
import { SharedModule } from './features/marasco/shared/shared.module';

@NgModule({
  declarations: [
    MarascoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MarascoRoutingModule,
    SharedModule,
    CoreModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [MarascoComponent]
})
export class AppModule { }
