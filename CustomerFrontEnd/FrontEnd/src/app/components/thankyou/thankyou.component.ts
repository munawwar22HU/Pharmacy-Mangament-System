import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
 message: string;
 orderId: string;
 products: ProductResponseModel[] = [];
 cartTotal: Number;
 orderData: OrderResponse;
  constructor(private router: Router,
    private productService: ProductService) {
    const navigation = this.router.getCurrentNavigation();

    const state = navigation.extras.state as {
     orderData: OrderResponse
    }



    
    // this.products = state.products;
    // console.log(this.products);
    this.orderData = state.orderData;
    this.orderId =  this.orderData.id;
    this.cartTotal = this.orderData.totalAmount;

    for (const p of this.orderData.medicine)
    {
      const id = p.medicineId;

      this.productService.getSingleProduct(id).subscribe(prod => {
        console.log(prod);
      this.products.push({
        id: prod.id,
        description: prod.description,
        price: prod.price,
        image: "http://localhost:3000/medicine/image/" + prod.medicineImage,
        quantityOrdered: p.quantity,
        name: prod.name

      });


    });
  }
    


  }

  ngOnInit(): void {
  }

}

interface ProductResponseModel {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantityOrdered: Number;
}



interface OrderResponse {
  id: string;
  userId: string
  
  medicine: [{
    medicineId: string,
    quantity: Number
  }];
  totalAmount: Number,
  status: String
}