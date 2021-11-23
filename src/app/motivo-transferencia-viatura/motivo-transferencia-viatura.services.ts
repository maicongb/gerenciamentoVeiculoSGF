import { MotivoTransferenciaViatura } from './models/motivo-transferencia-viatura.model';
import { MotivoTransferenciaViaturaFilter } from './models/motivo-transferencia-viatura-filter.model';
import { Observable } from 'rxjs';
import { PagedCollectionResponse } from '../core/service/models/collection-response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from '../core/service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MotivoTransferenciaViaturaService {

    motivoTransferenciaViaturasUrl: string;
    
    constructor(private api: ApiService, private http: HttpClient) {
        this.motivoTransferenciaViaturasUrl = 
                `${environment.api_url}/motivo-transferencia-viatura`;
    }

    find(
      sort: string,
      order: string,
      page: number,
      size: number,
      filter: MotivoTransferenciaViaturaFilter

    ): Observable<PagedCollectionResponse<MotivoTransferenciaViatura>> {
      return this.http.post<PagedCollectionResponse<MotivoTransferenciaViatura>>(              
              this.motivoTransferenciaViaturasUrl,
              filter,
              {
                  params: new HttpParams()
                      .append('sort', `${sort},${order}`)
                      .append('page', String(page))
                      .append('size', String(size)),
              }
          )   
      }

    get(id: string): Observable<MotivoTransferenciaViatura> {
        return this.http.get<MotivoTransferenciaViatura>(
                        `${this.motivoTransferenciaViaturasUrl}/${id}`);
    }

    save(value: MotivoTransferenciaViatura): Observable<any> {
      return this.http.post<MotivoTransferenciaViatura>(
                      `${this.motivoTransferenciaViaturasUrl}/salvar`, value);
    }

    update(value: MotivoTransferenciaViatura): Observable<any> {
      return this.http.put(
                      `${this.motivoTransferenciaViaturasUrl}/${value.id}`, value);
    }

    delete(id: number): Observable<any> {
      return this.http.delete(
                      `${this.motivoTransferenciaViaturasUrl}/${id}`);
  }

}
