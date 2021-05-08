import {Injectable} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = false;
  private SERVER_URL = environment.SERVER_URL;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<ResponseModel>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: number;

  constructor(private authService: AuthService,
              private httpClient: HttpClient) {

  }

  //  Login User with Email and Password
  loginUser(email: string, password: string) {
    console.log('function called');
    this.httpClient.post<ResponseModel>(`${this.SERVER_URL}/auth/login`, {email, password})
      .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((data: ResponseModel) => {
        if (typeof (data) === 'string') {
          this.loginMessage$.next(data);
        } else {
          console.log('hello');
          console.log(data);
          this.auth = data.auth;
          this.authState$.next(this.auth);
          this.userData$.next(data);
        }
      });

  }

 

  logout() {
    this.authService.signOut();
    this.auth = false;
    this.authState$.next(this.auth);
  }

  registerUser(formData: any): Observable<{ message: string }> {
    const {phone, name, email, password} = formData;
    console.log('Hellojee')
    console.log(formData);
   return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/auth/register`, {email,
    name, 
    password,
    phone});

   
  }


}


export interface ResponseModel {
  auth: boolean;
  email: string;
  name: string;
  phone: string;
  id: string;
  type: string;
}


