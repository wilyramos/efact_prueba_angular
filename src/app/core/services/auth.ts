import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = `${environment.apiUrl}/login`; // backend in express
  constructor(private http: HttpClient) { }

  login(username: string, pass: string): Observable<any> {
    // Angular envía el hash tal cual al backend local
    return this.http.post(this.url, { username, password: pass });
  }
}
