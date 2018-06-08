import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CameraPage } from '../pages/camera/camera';
import { SettingsPage } from '../pages/settings/settings';
import { GalleryPage } from '../pages/gallery/gallery';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

import { Pro } from '@ionic/pro';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { LoginService } from '../services/login.srv';
import { SettingsService } from '../services/settings.srv';
import { AuthService } from '../services/auth.srv';
import { GalleryService } from '../services/gallery.srv';
import { httpInterceptorProviders } from '../interceptors';
import { XeditableComponent } from '../widgets/xeditable/xeditable';
import { API_HOST_NAME, API_ENDPOINTS } from './constants';
import { PhotoViewer } from '@ionic-native/photo-viewer';

Pro.init('317d7924', {
  appVersion: '0.0.1'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch (e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    MyApp,
    CameraPage,
    SettingsPage,
    GalleryPage,
    TabsPage,
    LoginPage,
    XeditableComponent
  ],
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [API_HOST_NAME],
        blacklistedRoutes: [API_ENDPOINTS.login]
      }
    }),
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CameraPage,
    SettingsPage,
    GalleryPage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    PhotoViewer,
    SplashScreen,
    LoginService,
    SettingsService,
    AuthService,
    GalleryService,
    httpInterceptorProviders,
    Camera,
    File,
    FilePath,
    Keyboard,
    IonicErrorHandler,
    { provide: ErrorHandler, useClass: MyErrorHandler }
  ]
})
export class AppModule { }
