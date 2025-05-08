import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../model/users';
import { ApiResponse } from '../helper/apiresponse';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  Login(model:any)
  {
    return this.http.post<ApiResponse<user>>(environment.baseurl+"UserAuth",model);
  }

  register(model:any)
  {
    return this.http.post<ApiResponse<user>>(environment.baseurl+"UserAuth/Register",model);
  }

  forgot(model:any)
  {
    return this.http.post<ApiResponse<user>>(environment.baseurl+"UserAuth/forgotpasseword",model);
  }
}
