import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Medicine } from "../models/medicine.model";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root'
  })

export class MedicineService {

    constructor(private http: HttpClient) { }
    
    getMedicines() {
        return this.http.get<any>('assets/medicine.json')
        .toPromise()
        .then(res => <Medicine[]>res.data)
        .then(data => { return data; });
    }

    public getList(code: string, description: string, page: number, itemsPerPage: number) : Observable<Medicine[]> 
    {
        let params = new HttpParams();
        params = params.append('Code', code);
        params = params.append('Description', description);
        params = params.append('Page', page);
        params = params.append('ItemsPerPage', itemsPerPage);

        return this.http
        .get<Medicine[]>(`${environment.masterfileAPI}/medicine`, {params})
        .pipe(
            map((result) => {
            return result;
            })
        );
    }

    insert(data: Medicine) : Observable<Medicine>  {
        const url = `${environment.masterfileAPI}/medicine`;
        return this.http.post<Medicine>(url, data, httpOptions);
    } 
    update(id: number, data: Medicine): Observable<any> {
        return this.http.put(`${environment.masterfileAPI}/medicine/${id}`, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/medicine/${id}`);
    }





}