import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PhysicalExaminationDetail } from "../models/physicalexaminationdetail.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
  
@Injectable({
    providedIn: 'root'
})
  
export class PhysicalExaminationDetailService {
    PhysicalExaminationDetail : PhysicalExaminationDetail[]
    constructor(private http: HttpClient) { }
    
    public get(physicalExaminationTypeId: number, physicalExaminationDetailTypeId: number, code: string, description: string, page: number, itemsPerPage: number) 
    : Observable<PhysicalExaminationDetail[]> 
    {
        let params = new HttpParams();
        params = params.append('PhysicalExaminationTypeId', physicalExaminationTypeId);
        params = params.append('PhysicalExaminationDetailTypeId', physicalExaminationDetailTypeId);
        params = params.append('Code', code);
        params = params.append('Description', description);
        params = params.append('Page', page);
        params = params.append('ItemsPerPage', itemsPerPage);

        return this.http
        .get<PhysicalExaminationDetail[]>(`${environment.masterfileAPI}/physicalExaminationDetail`, {params})
        .pipe(
            map((result) => {
            return result;
            })
        );
    }
    GetPhysicalExaminationDetailByCode(HF_CODE: string): Observable<PhysicalExaminationDetail[]> {
        const params = new HttpParams()
            .set('Code', HF_CODE)
            .set('Page', 0)
            .set('ItemsPerPage', 999);
        return this.http.get<PhysicalExaminationDetail[]>(`${environment.masterfileAPI}/physicalExaminationDetail`, { params });
      }
    insert(data: PhysicalExaminationDetail) : Observable<PhysicalExaminationDetail>  {
        const url = `${environment.masterfileAPI}/physicalExaminationDetail`;
        return this.http.post<PhysicalExaminationDetail>(url, data, httpOptions);
    } 
    update(id: number, data: PhysicalExaminationDetail): Observable<any> {
        console.log(data);
        console.log(JSON.stringify(data));
        const url = `${environment.masterfileAPI}/physicalExaminationDetail/${id}`;
        return this.http.put(url, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/physicalExaminationDetail/${id}`);
    }

}