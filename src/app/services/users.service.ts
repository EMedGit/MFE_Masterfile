import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../models/user.model';
import { Claim, UserClaim } from '../models/userclaims.model';
import { BulkUserHealthFacility, UserHealthFacility } from '../models/userhealthfacility.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public prefix: any[] = [
    { description: 'Dr.' },
    { description: 'Dra.' },
    { description: 'Mr.' },
    { description: 'Mrs.' },
    { description: 'Ms.' },
  ];
  public usertype: any[] = [
    { description: 'Doctor' },
    { description: 'Nurse' },
    { description: 'Midwife' },
    { description: 'Triage' },
    { description: 'Pharmacists' },
    { description: 'Student' },
  ];
  public getUsersList(): Observable<Users[]> {
    let params = new HttpParams();
    // params = params.append('appId', appId);
    // params = params.append('appType', appType);
    return this.http
      .get<Users[]>(`${environment.authAPI}/identity/getuserslist`, { params })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  register(data: Users): Observable<Users> {
    const url = `${environment.authAPI}/identity/register`;
    return this.http.post<Users>(url, data, httpOptions);
  }
  updateuser(userid: string, data: Users): Observable<any> {
    return this.http.put(
      `${environment.authAPI}/identity/update/${userid}`,
      data,
      httpOptions
    );
  }
  resetDefaultPassword(userid: string): Observable<any> {
    return this.http.put(`${environment.authAPI}/identity/resetDefaultPassword/${userid}`, httpOptions);
  }
  getUserClaims(username: string): Observable<Claim[]> {
    let params = new HttpParams();
    params = params.append('username', username);
    params = params.append('group', 'EHR,SDN');
    return this.http
      .get<Claim[]>(`${environment.authAPI}/identity/getUserClaims`, { params })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  addupdateuserclaims(data: UserClaim): Observable<UserClaim> {
    const url = `${environment.authAPI}/identity/addUpdateUserClaims`;
    return this.http.post<UserClaim>(url, data, httpOptions);
  }
  getUserHealthFacility(userId : string): Observable<UserHealthFacility[]> {
    let params = new HttpParams();
    return this.http
      .get<UserHealthFacility[]>(`${environment.authAPI}/identity/userhealthfacility/${userId}`)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  registerUserHealthFacility(data : UserHealthFacility[]): Observable<UserHealthFacility[]> {
    const url = `${environment.authAPI}/identity/userhealthfacility`;
    return this.http.post<UserHealthFacility[]>(url, data, httpOptions);
  }
  bulkUpdateUserHealthFacility(data: BulkUserHealthFacility) : Observable<boolean> {
    const url = `${environment.authAPI}/identity/updateBulkUserhealthfacility`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
  bulkDeleteUserHealthFacility(data: BulkUserHealthFacility) : Observable<boolean> {
    const url = `${environment.authAPI}/identity/deleteBulkUserhealthfacility`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
}
