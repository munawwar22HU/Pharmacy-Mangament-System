import {Component, OnInit} from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import {ResponseModel, UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: ResponseModel;


  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.userData$.subscribe((data: ResponseModel ) => {
        this.myUser = data;
      });
  }

  logout() {
    this.userService.logout();
  }
}
