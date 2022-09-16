import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http : HttpClient) { }

  getBrandList() : Observable<Brand[]> {
    const params = new HttpParams()
      .set('Page', 0)
      .set('ItemsPerPage', 9999);
    return this.http.get<Brand[]>(`${environment.masterfileAPI}/brand`, { params })
  }
  GetBrandByCode(HF_CODE: string): Observable<Brand[]> {
    const params = new HttpParams()
      .set('Code', HF_CODE)
      .set('Page', 0)
      .set('ItemsPerPage', 999);
    return this.http.get<Brand[]>(`${environment.masterfileAPI}/brand`, { params });
  }
  postBrand(data : Brand) : Observable<Brand>{
    return this.http.post<Brand>(`${environment.masterfileAPI}/brand/`, data, httpOptions);
  }
  putBrand(id : number, data : Brand) : Observable<Brand>{
    return this.http.put<Brand>(`${environment.masterfileAPI}/brand/${id}`, data, httpOptions);
  }
  deleteBrand(id : number) : Observable<any>{
    return this.http.delete<Brand>(`${environment.masterfileAPI}/brand/${id}`, httpOptions)
  }
  batchdeleteBrand(data : Brand[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/brand/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}
