import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Immunization } from '../models/immunization.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class ImmunizationService {

  Immunizations : Immunization[]
  constructor(private http: HttpClient) { }

//   getRVS() {
//     return this.http.get<any>('assets/rvs.json')
//     .toPromise()
//     .then(res => <Immunization[]>res.data)
//     .then(data => { return data; });
// }

  public getImmunization(code: string, description: string, immunizationTypeId:number,page:number,itemsPerPage:number) : Observable<Immunization[]> 
  {
    let params = new HttpParams();
    params = params.append('Code', code);
    params = params.append('Description', description);
    params = params.append('ImmunizationTypeId', immunizationTypeId);
    params = params.append('Page', page);
    params = params.append('ItemsPerPage', itemsPerPage);

    return this.http
      .get<Immunization[]>(
        `${environment.masterfileAPI}/immunization`,
        { params }
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  GetImmunizationByCode(HF_CODE: string): Observable<Immunization[]> {
    const params = new HttpParams()
        .set('Code', HF_CODE)
        .set('Page', 0)
        .set('ItemsPerPage', 999);
    return this.http.get<Immunization[]>(`${environment.masterfileAPI}/immunization`, { params });
  }
  insert(data: Immunization) : Observable<Immunization>  {
    console.log(data);
    console.log(JSON.stringify(data));
    const url = `${environment.masterfileAPI}/immunization`;
    return this.http.post<Immunization>(url, data, httpOptions);
  } 
  update(id: number, data: Immunization): Observable<any> {
    console.log(data);
    console.log(JSON.stringify(data));
    const url = `${environment.masterfileAPI}/immunization/${id}`;
    return this.http.put(url, data, httpOptions);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.masterfileAPI}/immunization/${id}`);
  }

}

//https://masterfile-development.azurewebsites.net/api/v1/immunization?Code=aa&Description=aaa&ImmunizationTypeId=2&Page=1&ItemsPerPage=100
//https://masterfile-development.azurewebsites.net/api/v1/immunization

//Code=aa&Description=aaa&ImmunizationTypeId=2&Page=1&ItemsPerPage=100
