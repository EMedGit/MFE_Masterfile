import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Discounts } from '../models/discounts.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class DiscountsService {
  Discounts : Discounts[];
  constructor(private http : HttpClient) { }

  getDiscounts() : Observable<Discounts[]>{
    const params = new HttpParams()
      .set('Page', 0)
      .set('ItemsPerPage', 9999);
    return this.http.get<Discounts[]>(`${environment.masterfileAPI}/discounts`, { params });
  }
  postDiscounts(data : Discounts) : Observable<Discounts>{
    return this.http.post<Discounts>(`${environment.masterfileAPI}/discounts/`, data, httpOptions);
  }
  putDiscounts(id : number, data : Discounts) : Observable<Discounts>{
    return this.http.put<Discounts>(`${environment.masterfileAPI}/discounts/${id}`, data, httpOptions);
  }
  deleteDiscounts(id : number) : Observable<any>{
    return this.http.delete<Discounts>(`${environment.masterfileAPI}/discounts/${id}`, httpOptions);
  }
  btachdeleteDiscounts(data : Discounts[]) : Observable<boolean>{
    const url = `${environment.masterfileAPI}/discounts/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}
