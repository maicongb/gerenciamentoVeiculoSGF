import { MotivoExclusaoViaturaFilter } from './models/motivo-exclusao-viatura-filter.model';
import { MotivoExclusaoViatura } from './models/motivo-exclusao-viatura.model';
import { Observable } from 'rxjs';
import { PagedCollectionResponse } from '../core/service/models/collection-response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from '../core/service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MotivoExclusaoViaturaService {

    motivoExclusaoViaturasUrl: string;
    
    constructor(private api: ApiService, private http: HttpClient) {
        this.motivoExclusaoViaturasUrl = 
                `${environment.api_url}/motivo-exclusao-viatura`;
    }

    find(
      sort: string,
      order: string,
      page: number,
      size: number,
      filter: MotivoExclusaoViaturaFilter

    ): Observable<PagedCollectionResponse<MotivoExclusaoViatura>> {
      return this.http.post<PagedCollectionResponse<MotivoExclusaoViatura>>(              
              this.motivoExclusaoViaturasUrl,
              filter,
              {
                  params: new HttpParams()
                      .append('sort', `${sort},${order}`)
                      .append('page', String(page))
                      .append('size', String(size)),
              }
          )   
      }

    get(id: string): Observable<MotivoExclusaoViatura> {
        return this.http.get<MotivoExclusaoViatura>(
                        `${this.motivoExclusaoViaturasUrl}/${id}`);
    }

    save(value: MotivoExclusaoViatura): Observable<any> {
      return this.http.post<MotivoExclusaoViatura>(
                      `${this.motivoExclusaoViaturasUrl}/salvar`, value);
    }

    update(value: MotivoExclusaoViatura): Observable<any> {
      return this.http.put(
                      `${this.motivoExclusaoViaturasUrl}/${value.id}`, value);
    }

    delete(id: number): Observable<any> {
      return this.http.delete(
                      `${this.motivoExclusaoViaturasUrl}/${id}`);
  }

}
