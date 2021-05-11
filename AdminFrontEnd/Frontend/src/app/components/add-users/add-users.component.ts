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
  selectedFile: File;

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

      handleFileInput(event) {
        

        this.selectedFile = event.target.files[0]
  
        
    }


    register(form: NgForm) {
     
      const email = this.email;
      const password = this.password;
      const phone = this.phone;
      const name = this.name;
      const adminid =  this.myuser.id;
      const type = this.usertype;
      const userImage = this.selectedFile;
  
      const UploadData = new FormData();

      // console.log(this.selectedFile);
      UploadData.append('name',name);
      UploadData.append('email',email);
      UploadData.append('phone', phone);
      UploadData.append('id',adminid);
      UploadData.append('type',type);
      UploadData.append('userImage',userImage);

      if (form.invalid) {
        console.log('here');
        return;
      }
  
      // form.reset();
      this.reguserService.registerUser(UploadData).subscribe((response: { message: string }) => {
        console.log(response);
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
