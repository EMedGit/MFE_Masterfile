import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ICD10 } from "../models/icd10.model";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root'
})
export class ICD10Service {
    ICD10: ICD10[]
    constructor(private http: HttpClient) { }

    getProducts() {
        return this.http.get<any>('assets/icd10.json')
            .toPromise()
            .then(res => <ICD10[]>res.data)
            .then(data => { return data; });
    }

    public get(code: string, description: string, page: number, itemsPerPage: number)
        : Observable<ICD10[]> {
        let params = new HttpParams();
        params = params.append('Code', code);
        params = params.append('Description', description);
        params = params.append('Page', page);
        params = params.append('ItemsPerPage', itemsPerPage);

        return this.http
            .get<ICD10[]>(`${environment.masterfileAPI}/icd10`, { params })
            .pipe(
                map((result) => {
                    return result;
                })
            );
    }
    GetICDByCode(HF_CODE: string): Observable<ICD10[]> {
        const params = new HttpParams()
            .set('Code', HF_CODE)
            .set('Page', 0)
            .set('ItemsPerPage', 999);
        return this.http.get<ICD10[]>(`${environment.masterfileAPI}/icd10`, { params });
    }
    insert(data: ICD10): Observable<ICD10> {
        const url = `${environment.masterfileAPI}/icd10`;
        return this.http.post<ICD10>(url, data, httpOptions);
    }
    update(id: number, data: ICD10): Observable<any> {
        console.log(data);
        console.log(JSON.stringify(data));
        const url = `${environment.masterfileAPI}/icd10/${id}`;
        return this.http.put(url, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/icd10/${id}`);
    }





}