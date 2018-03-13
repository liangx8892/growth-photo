import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { GalleryPage } from '../gallery/gallery';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
import { SettingsService } from '../../services/settings.srv';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnDestroy {

  tab1Root = GalleryPage;
  //tab2Root = CameraPage;
  tab2Root = SettingsPage;
  @ViewChild('myTabs') tabRef: Tabs;

  private subscription: Subscription;
  constructor(private settingsService: SettingsService) {
    this.subscription = this.settingsService.settingNotFound.subscribe((errorCode: number) => {
      this.tabRef.select(1);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
