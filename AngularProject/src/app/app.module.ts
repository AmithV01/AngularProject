import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './Components/index/index.component';
import { HomeNavBarComponent } from './Components/Navigation/home-nav-bar/home-nav-bar.component';
import { HomeComponent } from './Components/LandingPages/home/home.component';
import { AdminComponent } from './Components/LandingPages/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestnavComponent } from './Components/Navigation/testnav/testnav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeNavBarComponent,
    HomeComponent,
    AdminComponent,
    TestnavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
