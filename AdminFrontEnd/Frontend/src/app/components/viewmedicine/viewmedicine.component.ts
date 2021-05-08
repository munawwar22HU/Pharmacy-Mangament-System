import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map} from 'rxjs/operators';
import {ProductModelServer, ServerResponse} from '../../models/product.model';


@Component({
  selector: 'app-viewmedicine',
  templateUrl: './viewmedicine.component.html',
  styleUrls: ['./viewmedicine.component.scss']
})
export class ViewmedicineComponent implements OnInit{

  id: number;
  product: ProductModelServer;
 

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void { this.route.paramMap.pipe(
    map((param: ParamMap) => {
      // @ts-ignore
      return param.params.id;
    })
  ).subscribe(prodId => {
    this.id = prodId;
    this.productService.getSingleProduct(this.id).subscribe(prod => {
      this.product = prod;
      console.log(prod);

    });
  });
}
}
