import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PhysicalExaminationSketch } from "../models/physicalexaminationsketch.model";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
    providedIn: 'root'
  })
  
export class PhysicalExaminationSketchService {
    
    constructor(private http: HttpClient) { }
    
    public getList(description: string, page: number, itemsPerPage: number) 
    : Observable<PhysicalExaminationSketch[]> 
    {
        let params = new HttpParams();
        params = params.append('Description', description);
        params = params.append('Page', page);
        params = params.append('ItemsPerPage', itemsPerPage);
        return this.http
        .get<PhysicalExaminationSketch[]>(`${environment.masterfileAPI}/physicalExaminationSketch`, {params})
        .pipe(
            map((result) => {
                return result;
            })
        );
    }

    insert(data: PhysicalExaminationSketch) : Observable<PhysicalExaminationSketch>  {
        const url = `${environment.masterfileAPI}/physicalExaminationSketch`;
        return this.http.post<PhysicalExaminationSketch>(url, data, httpOptions);
    } 
    update(id: number, data: PhysicalExaminationSketch): Observable<any> 
    {
        return this.http.put(`${environment.masterfileAPI}/physicalExaminationSketch/${id}`, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/physicalExaminationSketch/${id}`);
    }

    
}