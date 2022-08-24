import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ZScore } from "../models/zscore.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
    providedIn: 'root'
  })


  export class ZScoreService {
    
    constructor(private http: HttpClient) { }
    
    public getList(length: number, weight: number, months: number, gender: string, page: number, itemsPerPage: number) : Observable<ZScore[]> 
    {
        let params = new HttpParams();
        params = params.append('Length', length);
        params = params.append('Weight', weight);
        params = params.append('Months', months);
        params = params.append('Gender', gender);
        params = params.append('Page', page);
        params = params.append('ItemsPerPage', itemsPerPage);
        return this.http
        .get<ZScore[]>(`${environment.masterfileAPI}/zscore`, {params})
        .pipe(
            map((result) => {
                return result;
            })
        );
    }

    insert(data: ZScore) : Observable<ZScore>  {
        const url = `${environment.masterfileAPI}/zscore`;
        return this.http.post<ZScore>(url, data, httpOptions);
    } 
    update(id: number, data: ZScore): Observable<any> 
    {
        return this.http.put(`${environment.masterfileAPI}/zscore/${id}`, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/zscore/${id}`);
    }



  }
