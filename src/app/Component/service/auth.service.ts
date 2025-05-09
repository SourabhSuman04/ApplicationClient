import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../helper/apiresponse';
import { Users } from '../model/Users';
import { environment } from '../../enivironment/environmentr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signin(model:any)
  {
   return this.http.post<ApiResponse<Users>>(environment.baseurl+"UserAuth",model);
  }

  signup(model:any)
  {
    return this.http.post<ApiResponse<Users>>(environment.baseurl+"UserAuth/Register",model);
  }

  forgot(model:any)
  {
    return this.http.post<ApiResponse<Users>>(environment.baseurl+"UserAuth/forgotpassword",model);
  }
  }
  
