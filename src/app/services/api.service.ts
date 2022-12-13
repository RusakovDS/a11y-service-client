import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {
  }

  get<T>(path: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${path}`);
  }

  post<T>(path: string, body): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${path}`, body);
  }

  put<T>(path: string, body): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${path}`, body);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${path}`);
  }
}
