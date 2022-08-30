import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Barangay } from '../models/barangay.model';
import { Municipality } from '../models/municipality.model';
import { Province } from '../models/province.model';
import { Region } from '../models/region.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http : HttpClient) { }
  getBarangay(): Observable<Barangay[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 99999);
    return this.http.get<Barangay[]>(`${environment.addressInformationAPI}/barangay`, { params })
  }
  postBarangay(data : Barangay) : Observable<Barangay>{
    return this.http.post<Barangay>(`${environment.addressInformationAPI}/barangay/`, data, httpOptions);
  }
  putBarangay(id : number, data : Barangay) : Observable<Barangay>{
    return this.http.put<Barangay>(`${environment.addressInformationAPI}/barangay/${id}`, data, httpOptions);
  }
  deleteBarangay(id : number) : Observable<any>{
    return this.http.delete<Barangay>(`${environment.addressInformationAPI}/barangay/${id}`, httpOptions)
  }
  batchdeleteBarangay(data : Barangay[]) : Observable<boolean> {
    const url = `${environment.addressInformationAPI}/barangay/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
  getMunicipality(): Observable<Municipality[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 99999);
    return this.http.get<Municipality[]>(`${environment.addressInformationAPI}/municipality`, { params })
  }
  postMunicipality(data : Municipality) : Observable<Municipality>{
    return this.http.post<Municipality>(`${environment.addressInformationAPI}/municipality/`, data, httpOptions);
  }
  putMunicipality(id : number, data : Municipality) : Observable<Municipality>{
    return this.http.put<Municipality>(`${environment.addressInformationAPI}/municipality/${id}`, data, httpOptions);
  }
  deleteMunicipality(id : number) : Observable<any>{
    return this.http.delete<Municipality>(`${environment.addressInformationAPI}/municipality/${id}`, httpOptions)
  }
  batchdeleteMunicipality(data : Municipality[]) : Observable<boolean> {
    const url = `${environment.addressInformationAPI}/municipality/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
  getProvince(): Observable<Province[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 99999);
    return this.http.get<Province[]>(`${environment.addressInformationAPI}/province`, { params })
  }
  postProvince(data : Province) : Observable<Province>{
    return this.http.post<Province>(`${environment.addressInformationAPI}/province/`, data, httpOptions);
  }
  putProvince(id : number, data : Province) : Observable<Province>{
    return this.http.put<Province>(`${environment.addressInformationAPI}/province/${id}`, data, httpOptions);
  }
  deleteProvince(id : number) : Observable<any>{
    return this.http.delete<Province>(`${environment.addressInformationAPI}/province/${id}`, httpOptions)
  }
  batchdeleteProvince(data : Province[]) : Observable<boolean> {
    const url = `${environment.addressInformationAPI}/province/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
  getRegion(): Observable<Region[]> {
    const params = new HttpParams()      
      .set('Page', 0)
      .set('ItemsPerPage', 99999);
    return this.http.get<Region[]>(`${environment.addressInformationAPI}/region`, { params })
  }
  postRegion(data : Region) : Observable<Region>{
    return this.http.post<Region>(`${environment.addressInformationAPI}/region/`, data, httpOptions);
  }
  putRegion(id : number, data : Region) : Observable<Region>{
    return this.http.put<Region>(`${environment.addressInformationAPI}/region/${id}`, data, httpOptions);
  }
  deleteRegion(id : number) : Observable<any>{
    return this.http.delete<Region>(`${environment.addressInformationAPI}/region/${id}`, httpOptions)
  }
  batchdeleteRegion(data : Region[]) : Observable<boolean> {
    const url = `${environment.addressInformationAPI}/region/batchDelete`;
    return this.http.post<boolean>(url, data, httpOptions);
  }
  GetRegionById(id: number): Observable<Region[]> {
    return this.http.get<Region[]>(`${environment.addressInformationAPI}/region/${id}`);
  }
  GetProvinceByCode(regionCode: string): Observable<Province[]> {
    return this.http.get<Province[]>(`${environment.addressInformationAPI}/provinceByRegionCode/${regionCode}`);
  }
  GetMunicipalityByCode(provinceCode: string): Observable<Municipality[]> {
    return this.http.get<Municipality[]>(`${environment.addressInformationAPI}/municipality/${provinceCode}`);
  }
  GetBarangayByCode(municipalityCode: string): Observable<Barangay[]> {
    return this.http.get<Barangay[]>(`${environment.addressInformationAPI}/barangay/${municipalityCode}`);
  }
}
