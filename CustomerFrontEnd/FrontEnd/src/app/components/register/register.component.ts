import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  loginMessage: string;
  phone: string;
  name: string;
  selectedFile: File;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.userService.authState$.subscribe(authState => {
    //   if (authState) {
    //     this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || '/profile');
    //     console.log('Line 28');

    //   } else {
        this.router.navigateByUrl('/register');
        console.log('Line 32');
      
 
    }

    handleFileInput(event) {
      this.selectedFile = event.target.files[0]
  }

  


  // signInWithGoogle() {
  //   this.userService.googleLogin();
  // }

  register(form: NgForm) {
     
      const email = this.email;
      const password = this.password;
      const phone = this.phone;
      const name = this.name;
      const userImage = this.selectedFile;
  
      const UploadData = new FormData();

      // console.log(this.selectedFile);
      UploadData.append('name',name);
      UploadData.append('password', password);
      UploadData.append('email',email);
      UploadData.append('phone', phone);
      UploadData.append('userImage',userImage);

      if (form.invalid) {
        console.log('here');
        return;
      }

    // form.reset();
    this.userService.registerUser(UploadData).subscribe((response: { message: string }) => {
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

// registerUser() {

//   if (this.registrationForm.invalid) {
//     return;
//   }

//   // @ts-ignore
//   this.userService.registerUser({...this.registrationForm.value}).subscribe((response: { message: string }) => {
//     this.registrationMessage = response.message;
//   });

//   this.registrationForm.reset();
// }