import { Component } from '@angular/core';

//import { CameraPage } from '../camera/camera';
import { SettingsPage } from '../settings/settings';
import { GalleryPage } from '../gallery/gallery';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GalleryPage;
  //tab2Root = CameraPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
