import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('usernameInput') usernameInput: ElementRef;
  private username: string;
  private password: string;
  private error: string;

  constructor(private navCtrl: NavController, private keyboard: Keyboard) {

  }
  
  login(): void {
    this.navCtrl.push(TabsPage);
  }

  ionViewWillEnter(): void {
    setTimeout(() => {
      this.usernameInput.nativeElement.focus();
      this.keyboard.show();
    }, 800);
  }
}