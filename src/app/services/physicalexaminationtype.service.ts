import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PhysicalExaminationType } from "../models/physicalexaminationtype.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
  
@Injectable({
    providedIn: 'root'
})
export class PhysicalExaminationTypeService {
    PhysicalExaminationType : PhysicalExaminationType[]
    constructor(private http: HttpClient) { }
    
    get(): Observable<PhysicalExaminationType[]> {
        const params = new HttpParams()
          .set('Page', 0)
          .set('ItemsPerPage', 9999);
        return this.http.get<PhysicalExaminationType[]>(`${environment.masterfileAPI}/physicalExaminationType`, { params })
      }
    GetPhysicalExaminationTypeByCode(HF_CODE: string): Observable<PhysicalExaminationType[]> {
        const params = new HttpParams()
            .set('Type', HF_CODE)
            .set('Page', 0)
            .set('ItemsPerPage', 999);
        return this.http.get<PhysicalExaminationType[]>(`${environment.masterfileAPI}/physicalExaminationType`, { params });
      }
    insert(data: PhysicalExaminationType) : Observable<PhysicalExaminationType>  {
        const url = `${environment.masterfileAPI}/physicalExaminationType`;
        return this.http.post<PhysicalExaminationType>(url, data, httpOptions);
    } 
    update(id: number, data: PhysicalExaminationType): Observable<any> {
        console.log(data);
        console.log(JSON.stringify(data));
        const url = `${environment.masterfileAPI}/physicalExaminationType/${id}`;
        return this.http.put(url, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/physicalExaminationType/${id}`);
    }


}