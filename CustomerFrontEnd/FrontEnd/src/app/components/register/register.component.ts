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


  


  // signInWithGoogle() {
  //   this.userService.googleLogin();
  // }

  register(form: NgForm) {
    const email = this.email;
    const password = this.password;
    const phone = this.phone;
    const name = this.name;

    if (form.invalid) {
      return;
    }

    // form.reset();
    this.userService.registerUser({email,password,phone,name}).subscribe((response: { message: string }) => {
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