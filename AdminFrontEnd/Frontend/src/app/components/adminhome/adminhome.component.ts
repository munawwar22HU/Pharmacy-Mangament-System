import { Component, OnInit } from '@angular/core';
import {AdminviewService} from '../../services/adminview.service';
import {Router} from '@angular/router';
import {UserModelServer, UserServerResponse} from '../../models/user.model';
import {ResponseModel, UserService} from '../../services/user.service';


@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {

  users: UserModelServer[] = [];
  admin: ResponseModel;
  type: string = '';

  constructor(private adminviewService: AdminviewService, private router: Router,private userService: UserService) { }

  ngOnInit(): void {
    
    this.userService.userData$.subscribe((data: ResponseModel ) => {
      this.admin = data;
    });
    
    this.adminviewService.getAllUsers(this.admin.id, this.type).subscribe((prods: UserServerResponse) => {
      this.users = prods.users;
      console.log(this.users);
      this.users.forEach((element) => {
        if (element.userImage)
        {
          element.userImage = "http://localhost:3000/admin/image/" + element.userImage;
        }
        else
        {
          element.userImage = "https://img.icons8.com/bubbles/2x/user-male.png";
        }
        
        console.log(element.userImage);
    })

    });

  }
  selectUser(id: number) {
    this.router.navigate(['/user', id]).then();
  }


}
