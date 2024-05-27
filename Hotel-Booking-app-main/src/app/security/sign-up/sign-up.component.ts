import { Component, OnInit } from '@angular/core';
import userData from './../../../assets/Data/Users.json';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../helper/session.service';
import { AuthService } from '../helper/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Users } from '../../interfaces/Users';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router,
    private fb: FormBuilder, private http: HttpClient,
    private authService: AuthService,
    private sessionService: SessionService) { }

  signInForm: any = FormGroup;

  ngOnInit() {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  Signin() {
    //Add code to save the User
    this.router.navigate(['/sign-in']);
  }
}
