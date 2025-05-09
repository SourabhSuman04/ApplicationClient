import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../helper/apiresponse';
import { environment } from '../../enivironment/environmentr';
import { UserDetails } from '../model/UserDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsersDetails()
  {
    return this.http.get<ApiResponse<UserDetails>>(environment.baseurl+"UserDetails/GetUsersDetails")
  }

  getUsersDetailsbyid(id:any)
  {
   return this.http.get<ApiResponse<UserDetails>>(environment.baseurl+`UserDetails/GetUserById/${id}`)
  }

  Addorupdate(formData: FormData)
  {
    return this.http.post<ApiResponse<UserDetails>>(environment.baseurl+"UserDetails/AddorUpdate",formData)
  }
  // Addorupdate(formData: FormData): Observable<any> {
  //   return this.http.post<ApiResponse<UserDetails>>(environment.baseurl+"UserDetails/AddorUpdate",formData)
  // }
  delete(id:any)
  {
   return this.http.delete<ApiResponse<UserDetails>>(environment.baseurl+`UserDetails/DeleteUserDetails/${id}`)
  }
}
