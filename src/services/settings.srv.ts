import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINTS, API_CONSTANTS } from '../app/constants';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SettingsService {

  private settingObserveSource: Subject<number> = new Subject<number>();
  settingNotFound: Observable<number> = this.settingObserveSource.asObservable();
  
  constructor(private http:HttpClient) { }

  saveSettings(settings: Object) {
    return this.http.put(API_ENDPOINTS.settings, settings, httpOptions);
  }

  getSettings() {
    return this.http.get(API_ENDPOINTS.settings, httpOptions);
  }

  getSettingsFromCache() {
    let settingsStr = localStorage.getItem(API_CONSTANTS.USER_SETTINGS_NAME);
    let settings = {
      babyName: '',
      expectedBirthDate: '',
      birthDate: ''
    }
    if(settingsStr){
      settings = JSON.parse(settingsStr);
    }
    return settings;
  }

  getSettingObserveSource(): Subject<number> {
      return this.settingObserveSource;
  }
}