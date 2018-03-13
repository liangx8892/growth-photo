import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.srv';
import { SettingsService } from '../services/settings.srv';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
import { API_CONSTANTS } from './constants'

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnDestroy {
  rootPage: any = TabsPage;
  private subscription: Subscription;
  @ViewChild('myNav') nav: NavController;


  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, public jwtHelper: JwtHelperService,
    private authService: AuthService, private settingsService: SettingsService) {

    this.subscription = this.authService.requestIntercepted.subscribe((errorCode: number) => {
      this.nav.push(LoginPage);
    });

    var token = localStorage.getItem('access_token');
    var isExpired = jwtHelper.isTokenExpired(token);
    console.log('token in local storage', token);
    console.log('token is expired', isExpired);
    if (!token || isExpired) {
      this.rootPage = LoginPage;
    } else {
      settingsService.getSettings().subscribe(
        data => {
          if(data['NoResult']){
            this.settingsService.getSettingObserveSource().next(0);
          }else{
            let settingsString = JSON.stringify(data);
            localStorage.setItem(API_CONSTANTS.USER_SETTINGS_NAME, settingsString);
          }
        },
        error => {
          console.error('get settings failed:', error);
        }
      );
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
