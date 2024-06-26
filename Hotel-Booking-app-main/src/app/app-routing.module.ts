import { HomeComponent } from './layouts/home/home.component';
import { SignInComponent } from './security/sign-in/sign-in.component';
import { SignUpComponent } from './security/sign-up/sign-up.component';
import { HotelDetailComponent } from './components/hotel/hotel-detail/hotel-detail.component';
import { HotelListComponent } from './components/hotel/hotel-list/hotel-list.component';
import { LandingPageComponent } from './layouts/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { HotelLocationComponent } from './components/hotel/hotel-location/hotel-location.component';
import { AddHotelComponent } from './components/dashboard/add-hotel/add-hotel.component';

const routes: Routes = [
  {path:'', component:LandingPageComponent},
  {path:'hotel-list', component:HotelListComponent},
  
  {path:'hotel-detail/:id', component:HotelDetailComponent},
  {path:'sign-up', component:SignUpComponent},
  {path:'sign-in', component:SignInComponent},
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path:'location', component:HotelLocationComponent},
      { path: 'hotel-add', component: AddHotelComponent },

    ],
  },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
