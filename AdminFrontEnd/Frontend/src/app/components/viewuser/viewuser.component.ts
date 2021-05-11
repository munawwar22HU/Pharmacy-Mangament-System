import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, ParamMap,Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {ProductModelServer, ServerResponse} from '../../models/product.model';
import {ResponseModel, UserService} from '../../services/user.service';
import {AdminviewService} from '../../services/adminview.service'
import { UserModelServer } from '@app/models/user.model';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {

  user: UserModelServer;
  admin: ResponseModel;
  id: string;
  adminid : string;
  Message: string;
  constructor(private adminService: AdminviewService, private actroute: ActivatedRoute,private userService: UserService, private router:Router) {
}
  ngOnInit(): void {
    this.actroute.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
      ).subscribe(prodId => {
        this.id = prodId;
        this.adminService.getSingleUser(this.id).subscribe(prod => {
          this.user = prod.user;
          if (this.user.userImage)
          {
            this.user.userImage = "http://localhost:3000/admin/image/"+this.user.userImage;
          }
          else
          {
            this.user.userImage = "https://img.icons8.com/bubbles/2x/user-male.png";
          }
          
          
        });
  
    
    });
  
    this.userService.userData$.subscribe((data: ResponseModel ) => {
      this.admin = data;
      this.adminid = this.admin.id;
    });


  }

  remove(userId: string) {
  const id = this.adminid;
  this.adminService.removeUser(userId,id).subscribe(msg => {
    this.Message = msg.message;
    setTimeout(() => {
      this.Message = '';
    }, 2000);
    setTimeout(() => {
      this.router.navigateByUrl('/adminhome');
    }, 2000);
  });
  }


}
