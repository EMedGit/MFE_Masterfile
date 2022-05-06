import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Province } from "../models/province.model";

@Injectable({
    providedIn: 'root'
  })

export class ProvinceService {

    constructor(private http: HttpClient) { }
    
    getProvinces() {
        return this.http.get<any>('assets/province.json')
        .toPromise()
        .then(res => <Province[]>res.data)
        .then(data => { return data; });
    }
}