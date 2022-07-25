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

    public getDepartments(code: string, description: string, page: number, itemsPerPage: number) : Observable<Department[]> 
    {
        let params = new HttpParams();
        params = params.append('Code', code);
        params = params.append('Description', description);
        params = params.append('Page', page);
        params = params.append('ItemsPerPage', itemsPerPage);

        return this.http
        .get<Department[]>(`${environment.masterfileAPI}/department`, {params})
        .pipe(
            map((result) => {
            return result;
            })
        );
    }

<<<<<<< HEAD
    // insert(departments: Department) : Observable<boolean> {
    //     return this.http.post<boolean>(`${environment.masterfileAPI}/department`, departments, httpOptions);
    // }    
    insert(data: Department) : Observable<Department>  {
        const url = `${environment.masterfileAPI}/department`;
        return this.http.post<Department>(url, data, httpOptions);
    } 
=======
    insert(departments: Department) : Observable<boolean> {
        return this.http.post<boolean>(`${environment.masterfileAPI}/department`, departments, httpOptions);
    }    
>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42
    update(id: number, data: Department): Observable<any> {
        return this.http.put(`${environment.masterfileAPI}/department/${id}`, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/department/${id}`);
    }
}
