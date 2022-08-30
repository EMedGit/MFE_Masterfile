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
    
    public getList(code: string, description: string, page: number, itemsPerPage: number) : Observable<UserType[]> 
    {
        let params = new HttpParams();
        params = params.append('Code', code);
        params = params.append('Description', description);
        params = params.append('Page', page);
        params = params.append('ItemsPerPage', itemsPerPage);
        return this.http
        .get<UserType[]>(`${environment.masterfileAPI}/userType`, {params})
        .pipe(
            map((result) => {
                return result;
            })
        );
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
