import { SessionService } from './../../security/helper/session.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {

  constructor(private router: Router, private sessionService: SessionService) { }
  userLogged: boolean = false;
  isAdmin: boolean =false;
  ngOnInit() {
    this.userLogged = this.sessionService.isUserLoggedIn();
    this.isAdmin = this.sessionService.isAdmin();

    if (!this.userLogged) {
     alert("Please Login to continue !!");
      this.router.navigate(['/sign-in']);
    }
    else if (this.userLogged && !this.isAdmin) {
      alert("You are not an Admin !!");
      this.router.navigate(['']);
    }
   
      
  }

  logout(){
    this.sessionService.logout()
    this.router.navigate(['/sign-in'])

  }
  logIn() {
    this.router.navigate(['/sign-in'])
  }
}
