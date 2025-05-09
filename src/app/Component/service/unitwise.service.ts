import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enivironment/environmentr';

@Injectable({
  providedIn: 'root'
})
export class UnitwiseService {

  constructor(public http:HttpClient) { }

  getAllRecords(){
    return this.http.get(environment.baseurl+'UnitWise/GetAllUnitWiseRecords')
  }
}
