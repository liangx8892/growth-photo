import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('usernameInput') usernameInput: any;
  private username: string;
  private password: string;
  private error: string;

  constructor(private navCtrl: NavController) {

  }
  
  login(): void {
    this.navCtrl.push(TabsPage);
  }

  ionViewDidLoad(): void {
    setTimeout(() => {
      Keyboard.show();
      this.usernameInput.setFocus();
    }, 200);
  }
}