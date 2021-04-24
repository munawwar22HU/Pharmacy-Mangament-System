export interface ProductModelServer {
  id: number;
  name: string;
  description: string;
  prescription: string;
  price: number;
  image: string;
  stockquantity: number;
  category: string;
}

export interface ServerResponse {
  count: number;
  products: ProductModelServer[];
}
