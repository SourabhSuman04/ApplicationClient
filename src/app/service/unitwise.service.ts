import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../helper/apiresponse';
import { unitwise } from '../model/unitwise';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitwiseService {

  constructor(private http:HttpClient) { }

  getUnitwise(){
    return this.http.get<ApiResponse<unitwise>>(environment.baseurl+"UnitWise/GetAllUnitWiseRecords")
  }
}
