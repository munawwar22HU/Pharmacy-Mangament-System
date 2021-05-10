import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ProductModelServer, ServerResponse} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient) { }

  /* This is to fetch all products from the backend server */
  getAllProducts() : Observable<ServerResponse> {
    
    return this.http.get<ServerResponse>(this.SERVER_URL + '/medicine/search');
  }

  /* GET SINGLE PRODUCT FROM SERVER*/
  getSingleProduct(id: string): Observable<ProductModelServer> {
    // return this.http.get<ProductModelServer>(this.SERVER_URL + '/single' ,{});

    return this.http.post<ProductModelServer>(this.SERVER_URL + '/medicine/single',{id});
  }

  /*GET PRODUCTS FROM ONE CATEGORY */
  getProductsFromCategory(catName: string) : Observable<ProductModelServer[]>  {
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/products/category/' + catName);
   }
}
