import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RVS } from "../models/rvs.model";

@Injectable({
    providedIn: 'root'
  })
export class RVSService {

    constructor(private http: HttpClient) { }
    
    getRVS() {
        return this.http.get<any>('assets/rvs.json')
        .toPromise()
        .then(res => <RVS[]>res.data)
        .then(data => { return data; });
    }
}