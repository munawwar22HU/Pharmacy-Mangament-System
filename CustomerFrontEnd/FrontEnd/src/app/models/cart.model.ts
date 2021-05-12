import {ProductModelServer} from './product.model';


export interface CartModelServer {
  cart: [{
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    prescription: string,
    stockquantity: number
  }];
}

export interface CartModelPublic {
  total: number;
  prodData: [
    {
      id: string,
      incart: number
    }
  ];
}
