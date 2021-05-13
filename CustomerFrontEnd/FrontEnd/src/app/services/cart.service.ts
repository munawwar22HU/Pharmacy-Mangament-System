import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from './product.service';
import {OrderService} from './order.service';
import {environment} from '../../environments/environment';
import {CartModelPublic, CartModelServer} from '../models/cart.model';
import {BehaviorSubject,Observable} from 'rxjs';
import {NavigationExtras, Router} from '@angular/router';
import {ProductModelServer} from '../models/product.model';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private SERVER_URL = environment.SERVER_URL;
  private Ordertotal : number;

  // Data variable to store the cart information on the client's local storage
  private cartDataClient: CartModelPublic = {
    total: 0,
    prodData: [{
      incart: 0,
      id: ''
    }]
  };

  // Data variable to store cart information on the server - This needs to be changed as per our needs
  private cartDataServer: CartModelServer = {
    cart: [{
      quantity: 0,
      price: 0,
      id: '',
      prescription: '',
      description:'',
      name: '',
      stockquantity: 0
    }],
    total: 0
  };

  /* OBSERVABLES FOR THE COMPONENTS TO SUBSCRIBE*/
  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);


  constructor(private http: HttpClient,
              private productService: ProductService,
              private orderService: OrderService,
              private router: Router,
              private toast: ToastrService,
              private spinner: NgxSpinnerService) {

    this.cartTotal$.next(this.cartDataServer.total); // Calculate total
    this.cartData$.next(this.cartDataServer); 

    //  Get the information from local storage ( if any )
    const info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));
  
    //  Check if the info variable is null or has some data in it

    if (info !== null && info !== undefined && info.prodData[0].incart !== 0) {
    //  Local Storage is not empty and has some information
      this.cartDataClient = info;

      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach(p => {
        this.productService.getSingleProduct(p.id).subscribe((actualProductInfo: ProductModelServer) => {

          // This is the part that needs to be changed
          if (this.cartDataServer.cart[0].quantity === 0) {

            this.cartDataServer.cart[0].quantity = p.incart; 
            this.cartDataServer.cart[0].id = actualProductInfo.id;
            this.cartDataServer.cart[0].price = actualProductInfo.price;
            this.cartDataServer.cart[0].description = actualProductInfo.description;
            this.cartDataServer.cart[0].prescription = '';
            this.cartDataServer.cart[0].name =  actualProductInfo.name;
            this.cartDataServer.cart[0].stockquantity =  actualProductInfo.stockquantity;

            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            // CartDataServer already has some entry in it
            this.cartDataServer.cart.push({
              quantity: p.incart,
              price: actualProductInfo.price,
              id: actualProductInfo.id,
              name: actualProductInfo.name,
              prescription: '',
              description: actualProductInfo.description,
              stockquantity: actualProductInfo.stockquantity
            });

            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartData$.next({...this.cartDataServer});
        });
      });

    }

  }

  AddProductToCart(id: string, quantity?: number) {
    
    
    this.productService.getSingleProduct(id).subscribe(prod => {
     //  1. If the cart is empty
    if (this.cartDataServer.cart[0].id === '') {
      this.cartDataServer.cart[0].id = prod.id;
      this.cartDataServer.cart[0].name = prod.name;
      this.cartDataServer.cart[0].description = prod.description;
      this.cartDataServer.cart[0].price = prod.price;
      this.cartDataServer.cart[0].prescription ='';
      this.cartDataServer.cart[0].quantity = quantity !== undefined ? quantity : 1;
      this.cartDataServer.cart[0].stockquantity = prod.stockquantity;

    this.CalculateTotal();
    this.cartDataClient.prodData[0].incart = this.cartDataServer.cart[0].quantity;
    this.cartDataClient.prodData[0].id = prod.id;
    this.cartDataClient.total = this.cartDataServer.total;
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    this.cartData$.next({...this.cartDataServer});
    this.toast.success(`${prod.name} added to the cart`, 'Product Added', {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });

    } else {
    const index = this.cartDataServer.cart.findIndex(p =>p.id === prod.id);  // -1 or a positive value

    //     //     a. if that item is already in the cart  =>  index is positive value
    if (index !== -1) {
    if (quantity !== undefined && quantity <= prod.stockquantity) 
    {
      this.cartDataServer.cart[index].quantity = this.cartDataServer.cart[index].quantity < prod.stockquantity ? quantity : prod.stockquantity;
    } 
    else
    {
      this.cartDataServer.cart[index].quantity < prod.stockquantity ? this.cartDataServer.cart[index].quantity++ : prod.stockquantity;
    }
    this.cartDataClient.prodData[index].incart = this.cartDataServer.cart[index].quantity;
    this.CalculateTotal();
    this.cartDataClient.total = this.cartDataServer.total;
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    this.toast.info(`${prod.name} quantity updated in the cart`, 'Product Updated', {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });

    } else {
    this.cartDataServer.cart.push({
      quantity: 1,
      id: prod.id,
      name: prod.name,
      description: prod.description,
      prescription: '',
      price: prod.price,
      stockquantity: prod.stockquantity
      });

    this.cartDataClient.prodData.push({
      incart: 1,
      id: prod.id
      });
      this.toast.success(`${prod.name} added to the cart`, 'Product Added', {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });

    this.CalculateTotal();
    this.cartDataClient.total = this.cartDataServer.total;
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    this.cartData$.next({...this.cartDataServer});
    }  // END OF ELSE
    }
    });

    console.log(this.cartDataClient);
    console.log(this.cartDataServer);
  }

  UpdateCartItems(index: number, increase: boolean) {
    const data = this.cartDataServer.cart[index];

    if (increase){
      data.quantity < data.stockquantity ? data.quantity++ : data.stockquantity;
      this.cartDataClient.prodData[index].incart = data.quantity;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartData$.next({...this.cartDataServer});
    }
    else 
    {
      data.quantity--;

      if (data.quantity < 1) {
        this.DeleteProductFromCart(index);
        this.cartData$.next({...this.cartDataServer});
      } 
      else {
        this.cartData$.next({...this.cartDataServer});
        this.cartDataClient.prodData[index].incart = data.quantity;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  DeleteProductFromCart(index: number) {
    if (window.confirm('Are you sure you want to remove the item?')) {
      this.cartDataServer.cart.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = {total: 0, prodData: [{incart: 0, id: ''}]};
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else 
      {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {cart: [{  quantity: 0,
          price: 0,
          id: '',
          prescription: '',
          description:'',
          name: '',
          stockquantity: 0}],total:0};
        this.cartData$.next({...this.cartDataServer});
      } else {
        this.cartData$.next({...this.cartDataServer});
      }


    } else {
      // IF THE USER CLICKS THE CANCEL BUTTON
      return;
    }
  }

  async AdddSingleMedicine(id: string, medicineId: string,price: Number, quantity: Number ) 
  {
    const prescription = '';
    return this.http.post<{msg : string}>(`${this.SERVER_URL}/cart/add`,{id,medicineId,price,quantity,prescription}).toPromise();
  }
  

  CheckoutFromCart(id: string) {

    console.log('placing order');
    this.resetServerData();

    this.cartDataClient = {total: 0, prodData: [{incart: 0, id: ''}]};
    this.cartTotal$.next(0);
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

    return this.http.post<{ message: string }>(`${this.SERVER_URL}/cart/checkout`,{id}).toPromise();

  }

    
  //   this.http.post(`${this.serverURL}/orders/payment`, null).subscribe((res: { success: boolean }) => {
  //     if (res.success) {

  //       this.resetServerData();
  //       this.http.post(`${this.serverURL}/orders/new`, {
  //         userId,
  //         products: this.cartDataClient.prodData
  //       }).subscribe((data: OrderResponse) => {
  //         this.orderService.getSingleOrder(data.order_id).then(prods => {
  //           if (data.success) {
  //             const navigationExtras: NavigationExtras = {
  //               state: {
  //                 message: data.message,
  //                 products: prods,
  //                 orderId: data.order_id,
  //                 total: this.cartDataClient.total
  //               }
  //             };

  //             this.spinner.hide().then();
  //             this.router.navigate(['/thankyou'], navigationExtras).then(p => {
  //               this.cartDataClient = {total: 0, prodData: [{incart: 0, id: ''}]};
  //               this.cartTotal$.next(0);
  //               localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
  //             });
  //           }
  //         });
  //       });
  //     } else {
  //       this.spinner.hide().then();
  //       this.router.navigateByUrl('/checkout').then();
  //       this.toast.error(`Sorry, failed to book the order`, 'Order Status', {
  //         timeOut: 1500,
  //         progressBar: true,
  //         progressAnimation: 'increasing',
  //         positionClass: 'toast-top-right'
  //       });
  //     }
  //   });
  

  private CalculateTotal() {
    
    let Total = 0;

    this.cartDataServer.cart.forEach(p => {
      const numInCart = p.quantity;
      const price = p.price;

    Total += numInCart * price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }


  private resetServerData() {
    
    this.cartDataServer = {cart: [{  quantity: 0,
      price: 0,
      id: '',
      prescription: '',
      description:'',
      name: '',
      stockquantity: 0}], total:0};


    this.cartData$.next({...this.cartDataServer});
  }

  CalculateSubTotal(index): number {
    let subTotal = 0;

    const p = this.cartDataServer.cart[index];
    // @ts-ignore
    subTotal = p.price * p.quantity;

    return subTotal;
  }
}


interface OrderResponse {
  order_id: number;
  success: boolean;
  message: string;
  products: [{
    id: string,
    numInCart: string
  }];
}
