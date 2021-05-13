import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {OrderService} from '../../services/order.service';
import {NavigationExtras, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {CartModelServer} from '../../models/cart.model';
import { UserService , ResponseModel } from '@app/services/user.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartTotal: number;
  cartData: CartModelServer;
  id: string;
  myuser: ResponseModel;
  flag: Boolean = true;
  count: number;
  


  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.userService.userData$.subscribe((data: ResponseModel ) => {
      this.myuser = data;
    });


  }


 async onCheckout() {
    if (this.cartTotal > 0) {
      
      this.count = 0;
      const id =  this.myuser.id;
      for (const p of this.cartData.cart)
      {
        this.flag = false;
        const quantity = p.quantity;
        const price = p.price;
        const medicineId = p.id;
        console.log(p.id);
        let data = await this.cartService.AdddSingleMedicine(id,medicineId,price,quantity);
        console.log(data)
      };
    
    let httpdata = this.cartService.CheckoutFromCart(id);
    let orderdata =  (await httpdata).orderdata;
    const orderid = orderdata.id;
    const medicine = orderdata.medicine;
    const totalAmount = this.cartTotal;

    console.log(orderdata);

    const navigationExtras: NavigationExtras = {
    state: {
     orderData: orderdata 
    }

  };
    this.router.navigate(['/thankyou'],navigationExtras);
    } 
    else {
      return;
    }


  }
}
