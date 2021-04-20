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
  userData$ = new BehaviorSubject<SocialUser | ResponseModel | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: number;

  constructor(private authService: AuthService,
              private httpClient: HttpClient) {

    // authService.authState.subscribe((user: SocialUser) => {
    //   if (user != null) {
    //     this.httpClient.get(`${this.SERVER_URL}/users/validate/${user.email}`).subscribe((res: { status: boolean, user: object }) => {
    //       //  No user exists in database with Social Login
    //       if (!res.status) {
    //         // Send data to backend to register the user in database so that the user can place orders against his user id
    //         this.registerUser({
    //           email: user.email,
    //           fname: user.firstName,
    //           lname: user.lastName,
    //           password: '123456'
    //         }, user.photoUrl, 'social').subscribe(response => {
    //           if (response.message === 'Registration successful') {
    //             this.auth = true;
    //             this.userRole = 555;
    //             this.authState$.next(this.auth);
    //             this.userData$.next(user);
    //           }
    //         });

    //       } else {
    //         console.log('Yeh Kab call hota hai');
    //         this.auth = true;
    //         // @ts-ignore
    //         this.userRole = res.user.role;
    //         this.authState$.next(this.auth);
    //         this.userData$.next(res.user);
    //       }
    //     });

    //   }
    // });
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
          this.userRole = data.role;
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
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
  type: string;
  role: number;
}


