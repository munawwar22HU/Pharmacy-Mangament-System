import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistermedicineService} from '../../services/registermedicine.service';
import {ResponseModel, UserService} from '../../services/user.service';


@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent implements OnInit {

  name: string
  description: string;
  stockquantity: Number;
  price: Number;
  prescription: Boolean = false;
  myuser: ResponseModel;
  loginMessage: string;
 
  constructor(private authService: AuthService,
    private router: Router,
    private regmedService: RegistermedicineService,
    private userService: UserService)
    { }

  ngOnInit(): void {
    this.userService.userData$.subscribe((data: ResponseModel ) => {
      this.myuser = data;
    });
      }

      onCheckboxchange (event: any) {
        //update the ui
        this.prescription = event.target.value;
        console.log(this.prescription);
      }
    register(form: NgForm) {
      
      const name =  this.name;
      const description =  this.description;
      const stockquantity =  this.stockquantity;
      const price =  this.price;
      const prescription =  this.prescription
      const id = this.myuser.id;
  
      if (form.invalid) {
        return;
      }
  
      // form.reset();
      this.regmedService.registerMedicine(name,description,stockquantity,price,prescription,id).subscribe((response: { message: string }) => {
        this.loginMessage = response.message;
      });  
      form.reset();
  
  
  }

}
