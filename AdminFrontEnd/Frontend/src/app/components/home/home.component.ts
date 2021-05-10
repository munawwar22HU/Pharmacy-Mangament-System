import {Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router,ActivatedRoute} from '@angular/router';
import {ProductModelServer, ServerResponse} from '../../models/product.model';
import {ResponseModel, UserService} from '../../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];
  admin: ResponseModel;


  constructor(private productService: ProductService, private router: Router,private userService: UserService) { }

  ngOnInit(): void {
    
    this.productService.getAllProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products;

      this.products.forEach((element) => {
        element.medicineImage = "http://localhost:3000/medicine/image/" + element.medicineImage;
        console.log(element.medicineImage);
    });
     

    });

    this.userService.userData$.subscribe((data: ResponseModel ) => {
      this.admin = data;
    });

  }

  selectProduct(id: number) {
    this.router.navigate(['/medicine',id]).then();
    
   
  }

}
