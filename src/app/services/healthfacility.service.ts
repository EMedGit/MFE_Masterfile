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

    public getHealthFacility(code: string, name: string, page: number, itemsPerPage: number) : Observable<HealthFacility[]> 
    {
        let params = new HttpParams();
        params = params.append('Code', code);
        params = params.append('Name', name);
        params = params.append('Page', page);
        params = params.append('ItemsPerPage', itemsPerPage);

        // return this.http
        // .get<HealthFacility[]>(`${environment.masterfileAPI}/healthFacility`, {params})
        // .pipe(
        //     map((result) => {
        //     return result;
        //     })
        // );
        return this.http.get<HealthFacility[]>(`${environment.masterfileAPI}/healthFacility`, { params })
    }

    // insert(healthFacilities: HealthFacility) : Observable<boolean> {
    //     return this.http.post<boolean>(`${environment.masterfileAPI}/healthFacility`, healthFacilities, httpOptions);
    // }
    insert(data: HealthFacility) : Observable<HealthFacility>  {
        const url = `${environment.masterfileAPI}/healthfacility`;
        return this.http.post<HealthFacility>(url, data, httpOptions);
    } 
    update(id: number, data: HealthFacility): Observable<HealthFacility> {
        return this.http.put<HealthFacility>(`${environment.masterfileAPI}/healthFacility/${id}`, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/healthFacility/${id}`);
    }





}
