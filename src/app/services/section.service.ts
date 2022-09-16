import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Section } from "../models/section.model";
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
  
@Injectable({
    providedIn: 'root'
})
  
export class SectionService {
    Section : Section[]
    constructor(private http: HttpClient) { }

    public getSections(code: string, description: string, departmentId: number, page: number, itemsPerPage: number) : Observable<Section[]> 
    {
        let params = new HttpParams();
        params = params.append('Code', code);
        params = params.append('Description', description);
        params = params.append('DepartmentID', departmentId);
        params = params.append('Page', 0);
        params = params.append('ItemsPerPage', 99999999);

        return this.http
        .get<Section[]>(`${environment.masterfileAPI}/section`, {params})
        .pipe(
            map((result) => {
            return result;
            })
        );
    }

    // insert(section: Section) : Observable<boolean> {
    //     return this.http.post<boolean>(`${environment.masterfileAPI}/section`, section, httpOptions);
    // }
    GetSectionByCode(HF_CODE: string): Observable<Section[]> {
        const params = new HttpParams()
            .set('Code', HF_CODE)
            .set('Page', 0)
            .set('ItemsPerPage', 999);
        return this.http.get<Section[]>(`${environment.masterfileAPI}/section`, { params });
      }
    insert(data: Section) : Observable<Section>  {
        const url = `${environment.masterfileAPI}/section`;
        return this.http.post<Section>(url, data, httpOptions);
    } 
    update(id: number, data: Section): Observable<any> {
        return this.http.put(`${environment.masterfileAPI}/section/${id}`, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/section/${id}`);
    }
}