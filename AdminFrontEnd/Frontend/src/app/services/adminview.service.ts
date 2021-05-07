import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {UserModelServer, UserServerResponse} from '../models/user.model';
import { stringify } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class AdminviewService {

  private SERVER_URL = environment.SERVER_URL;
 
  constructor(private http: HttpClient) { }

  getAllUsers(id: string, type: string) : Observable<UserServerResponse> {
    console.log(id);
    
    
;
    return this.http.post<UserServerResponse>(this.SERVER_URL + '/admin/get-users',{id,type});

    
  }
}
