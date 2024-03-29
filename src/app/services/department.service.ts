import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Department } from "../models/department.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
  
@Injectable({
    providedIn: 'root'
})
  
export class DepartmentService {
    Department : Department[]
    constructor(private http: HttpClient) { }

    public getDepartments(code: string, description: string, healthFacilityId: number, page: number, itemsPerPage: number) : Observable<Department[]> 
    {
        let params = new HttpParams();
        params = params.append('Code', code);
        params = params.append('Description', description);
        params = params.append('HealthFacilityId', healthFacilityId);
        params = params.append('Page', 0);
        params = params.append('ItemsPerPage', 999999);

        return this.http
        .get<Department[]>(`${environment.masterfileAPI}/department`, {params})
        .pipe(
            map((result) => {
            return result;
            })
        );
    }

    // insert(departments: Department) : Observable<boolean> {
    //     return this.http.post<boolean>(`${environment.masterfileAPI}/department`, departments, httpOptions);
    // }    
    GetDepartmentByCode(HF_CODE: string): Observable<Department[]> {
        const params = new HttpParams()
          .set('Code', HF_CODE)
          .set('Page', 0)
          .set('ItemsPerPage', 999);
        return this.http.get<Department[]>(`${environment.masterfileAPI}/department`, { params });
      }
    insert(data: Department) : Observable<Department>  {
        console.log(data);
        console.log(JSON.stringify(data));
        const url = `${environment.masterfileAPI}/department`;
        return this.http.post<Department>(url, data, httpOptions);
    } 
    update(id: number, data: Department): Observable<any> {
        console.log(data);
        console.log(JSON.stringify(data));
        const url = `${environment.masterfileAPI}/department/${id}`;
        return this.http.put(url, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/department/${id}`);
    }
}
