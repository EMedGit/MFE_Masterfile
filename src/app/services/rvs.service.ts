import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RVS } from "../models/rvs.model";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root'
  })
export class RVSService {
    RVS: RVS
    constructor(private http: HttpClient) { }
      
    getRVS() : Observable<RVS[]>
    {
        const params = new HttpParams()
        .set('Page', 0)
        .set('ItemsPerPage', 9999)
        return this.http.get<RVS[]>(`${environment.masterfileAPI}/rvs`, { params })
    }

    GetRVSByCode(HF_CODE: string): Observable<RVS[]> {
        const params = new HttpParams()
            .set('Code', HF_CODE)
            .set('Page', 0)
            .set('ItemsPerPage', 999);
        return this.http.get<RVS[]>(`${environment.masterfileAPI}/rvs`, { params });
      }
    insert(data: RVS) : Observable<RVS>  {
        const url = `${environment.masterfileAPI}/rvs`;
        return this.http.post<RVS>(url, data, httpOptions);
    } 
    update(id: number, data: RVS): Observable<any> {
        console.log(data);
        console.log(JSON.stringify(data));
        const url = `${environment.masterfileAPI}/rvs/${id}`;
        return this.http.put(url, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/rvs/${id}`);
    }
}