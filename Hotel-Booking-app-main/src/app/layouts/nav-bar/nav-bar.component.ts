import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../security/helper/session.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private sessionService: SessionService) { }

  userLogged: boolean = false;
  ngOnInit() {
    this.userLogged = this.sessionService.isUserLoggedIn(); 
  }

  logout() {
    this.sessionService.logout()
    this.router.navigate(['/sign-in'])

  }
  logIn() {
    this.router.navigate(['/sign-in'])
  }
}
