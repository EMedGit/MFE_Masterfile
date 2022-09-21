import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ImmunizationType } from "../models/immunizationtype.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
  
@Injectable({
    providedIn: 'root'
})


export class ImmunizationTypeService {
    ImmunizationType: ImmunizationType [];
    constructor(private http: HttpClient) { }

    public getImmunizationType() : Observable<ImmunizationType[]> 
    {
        const params = new HttpParams()
        .set('Page', 0)
        .set('ItemsPerPage', 9999)
        return this.http.get<ImmunizationType[]>(`${environment.masterfileAPI}/immunizationType`, { params })
    } 
    GetImmunizationTypeByCode(HF_CODE: string): Observable<ImmunizationType[]> {
        const params = new HttpParams()
            .set('Code', HF_CODE)
            .set('Page', 0)
            .set('ItemsPerPage', 999);
        return this.http.get<ImmunizationType[]>(`${environment.masterfileAPI}/immunizationType`, { params });
      }
    insert(data: ImmunizationType) : Observable<ImmunizationType>  {
        const url = `${environment.masterfileAPI}/immunizationType`;
        return this.http.post<ImmunizationType>(url, data, httpOptions);
    } 
    update(id: number, data: ImmunizationType): Observable<any> {
        console.log(data);
        console.log(JSON.stringify(data));
        const url = `${environment.masterfileAPI}/immunizationType/${id}`;
        return this.http.put(url, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/immunizationType/${id}`);
    }





}