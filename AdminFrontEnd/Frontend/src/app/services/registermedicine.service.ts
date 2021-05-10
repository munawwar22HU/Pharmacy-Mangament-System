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

  registerMedicine(UploadData: FormData): Observable<{ message: string }> {
   
   
  
      
   
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/medicine/add`, UploadData);
}
}