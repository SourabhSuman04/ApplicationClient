import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../helper/apiresponse';
import { user } from '../model/users';
import { Userdetails } from '../model/userdetails';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {


  constructor(private http:HttpClient) { }

  getuserdetails()
  {
    return this.http.get<ApiResponse<Userdetails>>(environment.baseurl+"UserDetails/GetUsersDetails")
  }

  getuserdetailsbyid(id:any)
  {
    return this.http.get<ApiResponse<Userdetails>>(environment.baseurl+`UserDetails/GetUserById/${id}`)
  }

  addorupdate(model:any)
  {
    return this.http.post<ApiResponse<Userdetails>>(environment.baseurl+'UserDetails/AddorUpdate',model)
  }
  
  delete(id:any)
  {
    return this.http.delete<ApiResponse<Userdetails>>(environment.baseurl+`UserDetails/DeleteUserDetails/${id}`)
  }
}
