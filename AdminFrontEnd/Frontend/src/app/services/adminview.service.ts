import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {UserModelServer, UserResponse, UserServerResponse} from '../models/user.model';
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

  getSingleUser(id: string): Observable<UserResponse>
  {
    return this.http.post<UserResponse>(this.SERVER_URL + '/auth/get-user',{id});
    
  }

  removeUser(userId: string, id: string): Observable<{ message: string }>{
   
    return this.http.post<{ message: string }>(`${this.SERVER_URL}/admin/remove`, {id,
      userId});
  
    }
}
