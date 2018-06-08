import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINTS, API_CONSTANTS } from '../app/constants';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GalleryService {

  
  constructor(private http:HttpClient) { }

  savePhoto(photo) {
    return this.http.put(API_ENDPOINTS.photo, photo, httpOptions);
  }

  deletePhoto(photoId: String) {
    return this.http.delete(API_ENDPOINTS.photo + '/' + photoId, httpOptions);
  }

  getPhotos() {
    return this.http.get(API_ENDPOINTS.photo, httpOptions);
  }

  updatePhoto(photo) {
    return this.http.post(API_ENDPOINTS.photo, photo, httpOptions);
  }

  generateTitle(photo, settings) {
    let title = '';
    if(typeof settings.birthDate === 'string'){
      settings.birthDate = new Date(settings.birthDate);
    }
    if(typeof photo.createDate === 'string'){
      photo.createDate = new Date(photo.createDate);
    }
    if(settings.birthDate && photo.createDate >= settings.birthDate){
      var days = this.getDaysOffset(settings.birthDate, photo.createDate);
      title = settings.babyName + '出生第' + days + '天';
    }else if(settings.expectedBirthDate){
      var days = 280 - this.getDaysOffset(photo.createDate, settings.expectedBirthDate);
      var restDays = days % 7;
      var weeks = Math.floor(days/7);
      title = '孕' + weeks + '周' + restDays + '天';
    }
    return title;
  }

  private getDaysOffset(baseDate, actualDate) {
    if('string' === typeof baseDate){
      baseDate = new Date(baseDate.split('T')[0]);
    }
    if('string' === typeof actualDate){
      actualDate = new Date(actualDate.split('T')[0]);
    }
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    return Math.ceil((actualDate.getTime() - baseDate.getTime())/(oneDay));
  }
}