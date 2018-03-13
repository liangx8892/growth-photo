import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginService } from '../../services/login.srv';
import { SettingsService } from '../../services/settings.srv';
import { API_CONSTANTS } from '../../app/constants';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('usernameInput') usernameInput: any;
  private username: string;
  private password: string;
  private error: string;

  constructor(private navCtrl: NavController, private keyboard: Keyboard,
    private loginService: LoginService, private settingsService: SettingsService) {

  }

  login(): void {
    this.loginService.login({ username: this.username, password: this.password }).subscribe(
      data => {
        localStorage.setItem('access_token', data['token']);
        this.navCtrl.push(TabsPage);

        this.settingsService.getSettings().subscribe(
          data => {
            if (data['NoResult']) {
              this.settingsService.getSettingObserveSource().next(0);
            } else {
              let settingsString = JSON.stringify(data);
              localStorage.setItem(API_CONSTANTS.USER_SETTINGS_NAME, settingsString);
            }
          },
          error => {
            console.error('get settings failed:', error);
          }
        );
      },
      error => {
        this.error = '用户名和密码不正确！';
        console.error('login failed:', error);
      }
    );
  }

  ionViewDidLoad(): void {
    setTimeout(() => {
      this.usernameInput.setFocus();
      this.keyboard.show();
    }, 200);
  }
}