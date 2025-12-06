import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private http = inject(HttpClient);

  // Apuntamos a tu servidor Express local
  private baseUrl = 'http://localhost:3000/document';

  /**
   * Método genérico para descargar documentos
   * @param ticket El ID del ticket (ej: 571cc3a3...)
   * @param type Tipo de documento: 'pdf', 'xml', o 'cdr'
   */
  getDocument(ticket: string, type: 'pdf' | 'xml' | 'cdr'): Observable<Blob> {

    // 1. Recuperar el token del LocalStorage
    const token = localStorage.getItem('auth_token_efact');

    // 2. Configurar Headers
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // 3. Petición GET con responseType 'blob' (Binario)
    return this.http.get(`${this.baseUrl}/${type}/${ticket}`, {
      headers: headers,
      responseType: 'blob'
    });
  }
}
