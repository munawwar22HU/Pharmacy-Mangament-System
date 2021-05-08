import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegistermedicineService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private httpClient: HttpClient) { }

  registerMedicine(name:string,description:string,stockquantity:Number,price:Number,prescription:Boolean,id:string,medicineImage: File): Observable<{ message: string }> {
   
     

  
      
   
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/medicine/add`, {
    name, 
    description,
    stockquantity,
    price,
    prescription,
    id,
    medicineImage
  });
}
}