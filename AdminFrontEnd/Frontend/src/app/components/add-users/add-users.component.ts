import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisteruserService} from '../../services/registeruser.service';
import {ResponseModel, UserService} from '../../services/user.service';



@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  email: string;
  password: string;
  loginMessage: string;
  phone: string;
  name: string;
  usertype: string = "admin";
  myuser: ResponseModel;
  valuekey: number;
  constructor(private authService: AuthService,
    private router: Router,
    private reguserService: RegisteruserService,
    private userService: UserService)
    { }

  ngOnInit(): void {
    this.userService.userData$.subscribe((data: ResponseModel ) => {
      this.myuser = data;
    });
      }

      selectChangeHandler (event: any) {
        //update the ui
        this.usertype = event.target.value;
        console.log(this.usertype);
      }
    register(form: NgForm) {
     
      const email = this.email;
      const password = this.password;
      const phone = this.phone;
      const name = this.name;
      const adminid =  this.myuser.id;
      const type = this.usertype;
  
      if (form.invalid) {
        return;
      }
  
      // form.reset();
      this.reguserService.registerUser(email,password,phone,name,adminid,type).subscribe((response: { message: string }) => {
        this.loginMessage = response.message;
      });
      
  
      // this.userService.loginMessage$.subscribe(msg => {
      //   this.loginMessage = msg;
      //   setTimeout(() => {
      //     this.loginMessage = '';
      //   }, 2000);
      // });
  
      form.reset();
  
  
  }
}
