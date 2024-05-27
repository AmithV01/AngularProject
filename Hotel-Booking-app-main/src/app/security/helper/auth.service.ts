import { environment } from './../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import userData from './../../../assets/Data/Users.json';
import { Users } from '../../interfaces/Users';


interface Response {
  headers: {"Jwt-Token":string};
  body: String;
  rights: String;
} 

@Injectable({
  providedIn: 'root',
})
export class AuthService {


Url: string = environment.baseUrl + 'api/user/';
constructor(private http:HttpClient) { }


  loginIn(value: any): any{
    let user: Users[] = userData;
    let auth = false;
    let response: Response = {
      headers: { "Jwt-Token": "" }, body: "", rights:""
    };
    let authUser = user.filter(x => x.UserName == value["username"] && x.Password == value["password"]);
    if (value != null && authUser!=null) {
      auth = authUser.length == 1;
    }

    if (auth) {
      response.headers["Jwt-Token"] = "Testing";
      response.body = authUser[0].UserName;
      response.rights = authUser[0].RoleId.toString();
    }
    console.log(response);
    return response;
  //return this.http.post(this.Url + "login", value, {observe:"response"})
}


}
