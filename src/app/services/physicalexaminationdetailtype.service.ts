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
    PhysicalExaminationDetailType : PhysicalExaminationDetailType[]
    constructor(private http: HttpClient) { }
    
    public get(physicalExaminationTypeId: number, code: string, description: string, page: number, itemsPerPage: number) 
    : Observable<PhysicalExaminationDetailType[]> 
    {
        let params = new HttpParams();
        params = params.append('PhysicalExaminationTypeId', physicalExaminationTypeId);
        params = params.append('Code', code);
        params = params.append('Description', description);
        params = params.append('Page', page);
        params = params.append('ItemsPerPage', itemsPerPage);

        return this.http
        .get<PhysicalExaminationDetailType[]>(`${environment.masterfileAPI}/physicalExaminationDetailType`, {params})
        .pipe(
            map((result) => {
            return result;
            })
        );
    }
    insert(data: PhysicalExaminationDetailType) : Observable<PhysicalExaminationDetailType>  {
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