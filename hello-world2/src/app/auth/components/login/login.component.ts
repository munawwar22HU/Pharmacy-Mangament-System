import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import { Router } from '@angular/router';

@Component({

  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit {

  isLogin: boolean = false

  errorMessage

  constructor(

    private _api: ApiService,

    private _auth: AuthService,

    private _router:Router

    ) { }

    ngOnInit() {

      this.isUserLogin();

    }

    onSubmit(form: NgForm) {

      console.log('Your form data : ', form.value);

      this._api.postTypeRequest('auth/login', form.value).subscribe((res: any) => {
        
        console.log(res);
        if (res.status === 0) {

          console.log(res)

          this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));

          this._auth.setDataInLocalStorage('token', res.token);

          this._router.navigate(['']);

        } else {

        }

      }, err => {

        this.errorMessage = err['error'].message;

      });

    }

    isUserLogin(){

      console.log(this._auth.getUserDetails())

      if(this._auth.getUserDetails() != null){

        this.isLogin = true;

      }

    }

    logout(){

      this._auth.clearStorage()

      this._router.navigate(['']);

    }

  }