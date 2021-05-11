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
        if (this.myUser.userImage)
          {
            this.myUser.userImage = "http://localhost:3000/admin/image/"+this.myUser.userImage;
          }
          else
          {
            this.myUser.userImage = "https://img.icons8.com/bubbles/2x/user-male.png";
          }
      });
  }

  logout() {
    this.userService.logout();
  }
}
