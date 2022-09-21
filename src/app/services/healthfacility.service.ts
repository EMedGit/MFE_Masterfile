import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { HealthFacility } from "../models/healthfacility.model";
import { map, Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
  
@Injectable({
    providedIn: 'root'
})
  
export class HealthFacilityService {
    HealthFacility : HealthFacility[]
    constructor(private http: HttpClient) { }

    public getHealthFacility() : Observable<HealthFacility[]> 
    {
        const params = new HttpParams()
        .set('Page', 0)
        .set('ItemsPerPage', 9999)
        return this.http.get<HealthFacility[]>(`${environment.masterfileAPI}/healthFacility`, { params })
    }
    GetHealthFacilityByHealthFacilityCode(HF_CODE : string): Observable<HealthFacility[]> {
        const params = new HttpParams()  
        .set('Code',HF_CODE) 
        .set('Page', 0)
        .set('ItemsPerPage', 999);
      return this.http.get<HealthFacility[]>(`${environment.masterfileAPI}/healthfacility`, { params });
    }
    public getHealthFacilityById(id : number): Observable<HealthFacility> {
        return this.http.get<HealthFacility>(`${environment.masterfileAPI}/healthFacility/${id}`);
    }
    insert(data: HealthFacility) : Observable<HealthFacility>  {
        const url = `${environment.masterfileAPI}/healthfacility`;
        return this.http.post<HealthFacility>(url, data, httpOptions);
    } 
    update(id: number, data: HealthFacility): Observable<HealthFacility> {
        const url = `${environment.masterfileAPI}/healthFacility/${id}`;
        return this.http.put<HealthFacility>(url, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/healthFacility/${id}`);
    }





}
