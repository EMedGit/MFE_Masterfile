import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ICD10 } from "../models/masterfile.model";


@Injectable({
    providedIn: 'root'
  })
export class ICD10Service {

    constructor(private http: HttpClient) { }
    
    getProducts() {
        return this.http.get<any>('assets/icd10.json')
        .toPromise()
        .then(res => <ICD10[]>res.data)
        .then(data => { return data; });
    }
}