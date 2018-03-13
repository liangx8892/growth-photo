import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {

    private requestInterceptedSource: Subject<number> = new Subject<number>();
    requestIntercepted: Observable<number> = this.requestInterceptedSource.asObservable();

  constructor() { }

  getInterceptedSource(): Subject<number> {
      return this.requestInterceptedSource;
  }


}