import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Media } from '../models/media.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class ImageprocessingService {

  constructor(private http: HttpClient) { }

  upload(data: Media): Observable<Media> {
    const url = `${environment.mediaAPI}/media`;
    return this.http.post<Media>(url, data, httpOptions);
  }

  getImage(filePath: string, fileType: string): Observable<Blob> {
    let params = new HttpParams();
    params = params.append('FileType', filePath);
    params = params.append('FileType', fileType);
    return this.http.get<Blob>(`${environment.mediaAPI}/media`, {params});
  }
  


}
