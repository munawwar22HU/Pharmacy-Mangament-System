import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './components/product/product.component';
// import {CartComponent} from './components/cart/cart.component';
// import {CheckoutComponent} from './components/checkout/checkout.component';
// import {ThankyouComponent} from './components/thankyou/thankyou.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileGuard} from './guard/profile.guard';
import {HomeComponent} from './components/home/home.component';
import {HomeLayoutComponent} from './components/home-layout/home-layout.component';
import {AdminhomeComponent } from './components/adminhome/adminhome.component';
import {ViewProductsComponent} from './components/view-products/view-products.component';
import {AddUsersComponent} from './components/add-users/add-users.component';
import {AddMedicineComponent} from './components/add-medicine/add-medicine.component';
import { ViewmedicineComponent } from './components/viewmedicine/viewmedicine.component';
import { ViewuserComponent } from './components/viewuser/viewuser.component';

const routes: Routes = [
  // Define routes for the landing / home page, create a separate component for the layout of home page
  // put only header, footer and router-outlet there
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'user/:id', component: ViewuserComponent
      },
      {
        path: 'medicine/:id', component: ViewmedicineComponent,  canActivate: [ProfileGuard]
      },
      {
        path: 'adminhome', component: AdminhomeComponent
      },
      {
        path: 'viewproducts', component: ViewProductsComponent
      },
      {
        path: 'addmedicine', component: AddMedicineComponent
      },
      {
        path: 'adduser', component: AddUsersComponent
      },
      {
        path: '', component: LoginComponent
      },
      {
        path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard]
      }
      //, {
      //   path: 'register', component: RegisterComponent
      // },
    ]
  },


  // Wildcard Route if no route is found == 404 NOTFOUND page
  {
    path: '**', pathMatch: 'full', redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
