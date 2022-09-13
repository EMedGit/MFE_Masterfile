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
        // let params = new HttpParams();
        // params = params.append('Code', code);
        // params = params.append('Name', name);
        // params = params.append('Page', 0);
        // params = params.append('ItemsPerPage', 999999);
        // return this.http
        // .get<HealthFacility[]>(`${environment.masterfileAPI}/healthFacility`, {params})
        // .pipe(
        //     map((result) => {
        //     return result;
        //     })
        // );
        const params = new HttpParams()
        .set('Page', 0)
        .set('ItemsPerPage', 9999)
        return this.http.get<HealthFacility[]>(`${environment.masterfileAPI}/healthFacility`, { params })
    }
    public GetHealthFacilityByHealthFacilityCode(HF_CODE : string): Observable<HealthFacility[]> {
        const params = new HttpParams()  
        .set('Code',HF_CODE) 
        .set('Page', 0)
        .set('ItemsPerPage', 999);
      return this.http.get<HealthFacility[]>(`${environment.masterfileAPI}/healthfacility`, { params });
    }
    insert(data: HealthFacility) : Observable<HealthFacility>  {
        const url = `${environment.masterfileAPI}/healthfacility`;
        return this.http.post<HealthFacility>(url, data, httpOptions);
    } 
    update(id: number, data: HealthFacility): Observable<HealthFacility> {
        console.log(data);
        console.log(JSON.stringify(data));
        const url = `${environment.masterfileAPI}/healthFacility/${id}`;
        return this.http.put<HealthFacility>(url, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/healthFacility/${id}`);
    }





}
