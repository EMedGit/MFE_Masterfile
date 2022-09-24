import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserType } from "../models/usertype.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
    providedIn: 'root'
  })


  export class UserTypeService {
    
    constructor(private http: HttpClient) { }
    
    getList() : Observable<UserType[]> {
        const params = new HttpParams()
          .set('Page', 0)
          .set('ItemsPerPage', 9999);
        return this.http.get<UserType[]>(`${environment.masterfileAPI}/userType`, { params })
      }
    GetUserTypeByCode(HF_CODE: string): Observable<UserType[]> {
        const params = new HttpParams()
            .set('Code', HF_CODE)
            .set('Page', 0)
            .set('ItemsPerPage', 999);
        return this.http.get<UserType[]>(`${environment.masterfileAPI}/userType`, { params });
      }
    insert(data: UserType) : Observable<UserType>  {
        const url = `${environment.masterfileAPI}/userType`;
        return this.http.post<UserType>(url, data, httpOptions);
    } 
    update(id: number, data: UserType): Observable<any> 
    {
        return this.http.put(`${environment.masterfileAPI}/userType/${id}`, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/userType/${id}`);
    }



  }
