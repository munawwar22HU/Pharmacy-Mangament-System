export interface ProductModelServer {
  id: string;
  name: string;
  description: string;
  prescription: Boolean;
  price: number;
  medicineImage: string;
  stockquantity: number;
}

export interface ServerResponse {
  products: ProductModelServer[];
}
