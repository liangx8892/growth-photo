import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.srv';
import { LoadingController } from 'ionic-angular';
import { API_CONSTANTS } from '../../app/constants'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  private settings: Object;

  constructor(private settingsService: SettingsService,
    private loading: LoadingController) {
    this.settings = this.settingsService.getSettingsFromCache();
  }

  saveSettings() {
    let loader = this.loading.create({
      spinner: 'bubbles',
      content: "保存设置，请稍候..."
    });
    loader.present();
    this.settingsService.saveSettings(this.settings).subscribe(
      data => {
        localStorage.setItem(API_CONSTANTS.USER_SETTINGS_NAME, JSON.stringify(this.settings));
        loader.dismiss();
      },
      error => {
        console.error('save settings failed:', error);
        loader.dismiss();
      }
    );
  }

}
