import { MotivoBaixaViatura } from './models/motivo-baixa-viatura.model';
import { MotivoBaixaViaturaFilter } from './models/motivo-baixa-viatura-filter.model';
import { Observable } from 'rxjs';
import { PagedCollectionResponse } from '../core/service/models/collection-response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from '../core/service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MotivoBaixaViaturaService {

    motivoBaixaViaturasUrl: string;
    
    constructor(private api: ApiService, private http: HttpClient) {
        this.motivoBaixaViaturasUrl = 
                `${environment.api_url}/motivo-baixa-viatura`;
    }

    find(
      sort: string,
      order: string,
      page: number,
      size: number,
      filter: MotivoBaixaViaturaFilter

    ): Observable<PagedCollectionResponse<MotivoBaixaViatura>> {
      return this.http.post<PagedCollectionResponse<MotivoBaixaViatura>>(              
              this.motivoBaixaViaturasUrl,
              filter,
              {
                  params: new HttpParams()
                      .append('sort', `${sort},${order}`)
                      .append('page', String(page))
                      .append('size', String(size)),
              }
          )   
      }

    get(id: string): Observable<MotivoBaixaViatura> {
        return this.http.get<MotivoBaixaViatura>(
                        `${this.motivoBaixaViaturasUrl}/${id}`);
    }

    save(value: MotivoBaixaViatura): Observable<any> {
      return this.http.post<MotivoBaixaViatura>(
                      `${this.motivoBaixaViaturasUrl}/salvar`, value);
    }

    update(value: MotivoBaixaViatura): Observable<any> {
      return this.http.put(
                      `${this.motivoBaixaViaturasUrl}/${value.id}`, value);
    }

    delete(id: number): Observable<any> {
      return this.http.delete(
                      `${this.motivoBaixaViaturasUrl}/${id}`);
  }

}
