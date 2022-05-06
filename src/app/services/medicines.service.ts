import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Medicine } from "../models/medicine.model";

@Injectable({
    providedIn: 'root'
  })

export class MedicineService {

    constructor(private http: HttpClient) { }
    
    getMedicines() {
        return this.http.get<any>('assets/medicine.json')
        .toPromise()
        .then(res => <Medicine[]>res.data)
        .then(data => { return data; });
    }
}