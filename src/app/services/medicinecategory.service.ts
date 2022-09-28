import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medicinecategory } from '../models/medicinecategory.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class MedicinecategoryService {
  MedicineCategory : Medicinecategory[];
  constructor(private http : HttpClient) { }

  getMedicineCategory(): Observable<Medicinecategory[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 9999);
    return this.http.get<Medicinecategory[]>(`${environment.masterfileAPI}/medicineCategory`, { params })
  }
  GetMedicineCategoryByCode(HF_CODE: string): Observable<Medicinecategory[]> {
    const params = new HttpParams()
        .set('Code', HF_CODE)
        .set('Page', 0)
        .set('ItemsPerPage', 999);
    return this.http.get<Medicinecategory[]>(`${environment.masterfileAPI}/medicineCategory`, { params });
  }
  postMedicineCategory(data : Medicinecategory) : Observable<Medicinecategory>{
    return this.http.post<Medicinecategory>(`${environment.masterfileAPI}/medicineCategory/`, data, httpOptions);
  }
  putMedicineCategory(id: number, data : Medicinecategory) : Observable<Medicinecategory>{
    return this.http.put<Medicinecategory>(`${environment.masterfileAPI}/medicineCategory/${id}`, data, httpOptions);
  }
  deleteMedicineCategory(id: number) : Observable<any>{
    return this.http.delete<Medicinecategory>(`${environment.masterfileAPI}/medicineCategory/${id}`, httpOptions);
  }
  batchdeleteMedicineCategory(data: Medicinecategory[]) : Observable<boolean> {
    const url = `${environment.masterfileAPI}/medicineCategory/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}
