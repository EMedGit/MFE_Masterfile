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
    Department : Section[]
    constructor(private http: HttpClient) { }

    public getSections(code: string, description: string, page: number, itemsPerPage: number) : Observable<Section[]> 
    {
        let params = new HttpParams();
        params = params.append('Code', code);
        params = params.append('Description', description);
        params = params.append('Page', page);
        params = params.append('ItemsPerPage', itemsPerPage);

        return this.http
        .get<Section[]>(`${environment.masterfileAPI}/section`, {params})
        .pipe(
            map((result) => {
            return result;
            })
        );
    }

<<<<<<< HEAD
    // insert(section: Section) : Observable<boolean> {
    //     return this.http.post<boolean>(`${environment.masterfileAPI}/section`, section, httpOptions);
    // }
    insert(data: Section) : Observable<Section>  {
        const url = `${environment.masterfileAPI}/section`;
        return this.http.post<Section>(url, data, httpOptions);
    } 
=======
    insert(section: Section) : Observable<boolean> {
        return this.http.post<boolean>(`${environment.masterfileAPI}/section`, section, httpOptions);
    }
>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42
    update(id: number, data: Section): Observable<any> {
        return this.http.put(`${environment.masterfileAPI}/section/${id}`, data, httpOptions);
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.masterfileAPI}/section/${id}`);
    }
}