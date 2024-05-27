import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  setUser(data: any) {
    sessionStorage.setItem('loggedInUser', JSON.stringify(data));
  }

  getUser() {
    let res = sessionStorage.getItem('loggedInUser');
    if (res != null)
      return JSON.parse(sessionStorage.getItem('loggedInUser') || '');
    else
      return null;
  }

  setToken(token: any) {
    sessionStorage.setItem('token', token);
  }
  getToken() {
    return sessionStorage.getItem('token');
  }

  setRights(rights: any) {
    sessionStorage.setItem('rights', rights);
  }
  getRights() {
    return sessionStorage.getItem('rights');
  }
  logout() {
    return sessionStorage.clear();
  }

  isUserLoggedIn(): boolean {
    let userLogged = false;
    let user = this.getUser();
    let token = this.getToken();
    if (user != null && user != "" && token != null && token != "")
      userLogged = true;
    return userLogged;
  }

  isAdmin(): boolean {
    if (this.getRights() == "1")
      return true;
    else
      return false;
  }
}
