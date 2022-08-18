import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../models/user.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  
  public prefix:any[]=[{description:"Dr."},{description:"Dra."},{description:"Mr."},{description:"Mrs."},{description:"Ms."}]
  public usertype:any[]=[{description:"Doctor"},{description:"Nurse"},{description:"Midwife"},{description:"Triage"},{description:"Pharmacists"},{description:"Student"}]
  public getUsersList() : Observable<Users[]> 
  {
      let params = new HttpParams();
      // params = params.append('appId', appId);
      // params = params.append('appType', appType);
      return this.http
      .get<Users[]>(`${environment.authAPI}/identity/getuserslist`, {params})
      .pipe(
          map((result) => {
          return result;
          })
      );
  }
  register(data: Users) : Observable<Users>  {
      const url = `${environment.authAPI}/identity/register`;
      return this.http.post<Users>(url, data, httpOptions);
  } 
  updateuser(userid:string,data: Users): Observable<any> {
      return this.http.put(`${environment.authAPI}/identity/update/${userid}`, data, httpOptions);
  }
  // delete(id: number): Observable<any> {
  //     return this.http.delete(`${environment.masterfileAPI}/section/${id}`);
  // }
}