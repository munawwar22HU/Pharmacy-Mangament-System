import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {ProductModelServer, ServerResponse} from '../../models/product.model';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];


  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((prods: ServerResponse) => {
    this.products = prods.products;

    this.products.forEach( (element) => {
      element.medicineImage = "http://localhost:3000/medicine/image/" + element.medicineImage;
      console.log(element.medicineImage);
  });
   

    
        
    });

    
    
  }

  selectProduct(id: string) {
    this.router.navigate(['/product', id]).then();
  }

  AddToCart(id: string) {
    console.log('Add to Cart');
    this.cartService.AddProductToCart(id);
  }
}
