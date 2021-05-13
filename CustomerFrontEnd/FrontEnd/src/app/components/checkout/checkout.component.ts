import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';
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

  async addMedToCart(id:string,quantity: Number,price: Number, medicineId: string)
  {
    
    let httpdata = await this.cartService.AdddSingleMedicine(id,medicineId,price,quantity);
    console.log(httpdata);
    


    
    
    
    
  }

  async onCheckout() {
    if (this.cartTotal > 0) {
      
      const id =  this.myuser.id;
      this.cartData.cart.forEach(p => {
        this.flag = false;
        const quantity = p.quantity;
        const price = p.price;
        const medicineId = p.id;
        this.addMedToCart(id,quantity,price,medicineId);
        this.flag = true;
        
      });
    
    if (this.flag===true)
    {
     let httpdata = await this.cartService.CheckoutFromCart(id);
    }
     
      
    } 
    else {
      return;
    }


  }
}
