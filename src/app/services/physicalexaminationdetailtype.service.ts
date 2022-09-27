import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PhysicalExaminationDetailType } from "../models/physicalexaminationdetailtype.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root'
})
export class PhysicalExaminationDetailTypeService {
    PhysicalExaminationDetailType: PhysicalExaminationDetailType[]
    constructor(private http: HttpClient) { }

    get(): Observable<PhysicalExaminationDetailType[]> {
        const params = new HttpParams()
            .set('Page', 0)
            .set('ItemsPerPage', 9999);
        return this.http.get<PhysicalExaminationDetailType[]>(`${environment.masterfileAPI}/physicalExaminationDetailType`, { params })
    }
    getPhysicalExaminationDetailTypeById(id: number): Observable<PhysicalExaminationDetailType[]> {
        const params = new HttpParams()
            .set('PhysicalExaminationTypeId', id)
            .set('Page', 0)
            .set('ItemsPerPage', 9999);
        return this.http.get<PhysicalExaminationDetailType[]>(`${environment.masterfileAPI}/physicalExaminationDetailType`, { params })
    }
    GetPhysicalExaminationDetailTypeByCode(HF_CODE: string): Observable<PhysicalExaminationDetailType[]> {
        const params = new HttpParams()
            .set('Code', HF_CODE)
            .set('Page', 0)
            .set('ItemsPerPage', 999);
        return this.http.get<PhysicalExaminationDetailType[]>(`${environment.masterfileAPI}/physicalExaminationDetailType`, { params });
    }
    insert(data: PhysicalExaminationDetailType): Observable<PhysicalExaminationDetailType> {
        const url = `${environment.masterfileAPI}/physicalExaminationDetailType`;
        return this.http.post<PhysicalExaminationDetailType>(url, data, httpOptions);
    }
    update(id: number, data: PhysicalExaminationDetailType): Observable<any> {
        console.log(data);
        console.log(JSON.stringify(data));
        const url = `${environment.masterfileAPI}/physicalExaminationDetailType/${id}`;
        return this.http.put(url, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/physicalExaminationDetailType/${id}`);
    }

}