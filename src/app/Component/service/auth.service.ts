import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../helper/apiresponse';
import { Users } from '../model/Users';
import { environment } from '../../enivironment/environmentr';
import { Client, Account } from 'appwrite';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any;
   client: Client;
  account: Account;

  constructor(private http:HttpClient) {   this.client = new Client()
      .setEndpoint('https://fra.cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
      .setProject('682aba13001ca98f6656'); // Replace with your project ID

    this.account = new Account(this.client); }

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

  outh(idToken:any)
  {
      return this.http.post(environment.baseurl+'UserAuth/google', { token:idToken }).subscribe({
        next: res => console.log('Backend response', res),
        error: err => console.error('Backend error', err),
            });
  }

 
 

  loginWithOAuth(provider: any, successUrl: string, failureUrl: string) {
    this.account.createOAuth2Session(provider, successUrl, failureUrl);
  }

  async getUser() {
    try {
      return await this.account.get();
    } catch (error) {
      return null;
    }
  }

    async logout() {
    return await this.account.deleteSession('current');
  }

  } 
  
