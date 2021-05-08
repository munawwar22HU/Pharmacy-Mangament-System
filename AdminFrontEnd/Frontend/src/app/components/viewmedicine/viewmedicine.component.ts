import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, ParamMap,Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {ProductModelServer, ServerResponse} from '../../models/product.model';
import {ResponseModel, UserService} from '../../services/user.service';

@Component({
  selector: 'app-viewmedicine',
  templateUrl: './viewmedicine.component.html',
  styleUrls: ['./viewmedicine.component.scss']
})
export class ViewmedicineComponent implements OnInit{

  id: string;
  adminid: string;
  product: ProductModelServer;
  myuser: ResponseModel;
  Message: string;
  constructor(private productService: ProductService, private actroute: ActivatedRoute,private userService: UserService, private router:Router) {
  }

  ngOnInit(): void { 

    this.actroute.paramMap.pipe(
    map((param: ParamMap) => {
      // @ts-ignore
      return param.params.id;
    })
    ).subscribe(prodId => {
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe(prod => {
        this.product = prod;
        this.product.image = "http://localhost:3000/medicine/image/"+this.product.image;
      });

  
  });

  this.userService.userData$.subscribe((data: ResponseModel ) => {
    this.myuser = data;
    this.adminid = this.myuser.id;
  });

  
  
}

logout(medicineId: string) {
  const id = this.adminid;
  this.productService.removeMedicine(medicineId,id).subscribe(msg => {
    this.Message = msg.message;
    setTimeout(() => {
      this.Message = '';
    }, 2000);
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 2000);
  });
}
}
