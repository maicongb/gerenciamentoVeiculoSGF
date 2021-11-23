import { Observable } from 'rxjs';
import { TipoViatura } from './models/tipo-viatura.model';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { TipoViaturaFilter } from './models/tipo-viatura-filter.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ApiService } from './../core/service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoViaturaService {

    tipoViaturasUrl: string;
    
    constructor(private api: ApiService, private http: HttpClient) {
        this.tipoViaturasUrl = `${environment.api_url}/tipo-viatura`;
    }

    find(
      sort: string,
      order: string,
      page: number,
      size: number,
      filter: TipoViaturaFilter

    ): Observable<PagedCollectionResponse<TipoViatura>> {
      return this.http.post<PagedCollectionResponse<TipoViatura>>(              
              this.tipoViaturasUrl,
              filter,
              {
                  params: new HttpParams()
                      .append('sort', `${sort},${order}`)
                      .append('page', String(page))
                      .append('size', String(size)),
              }
          )   
      }

    get(id: string): Observable<TipoViatura> {
        return this.http.get<TipoViatura>(
                        `${this.tipoViaturasUrl}/${id}`);
    }

    save(value: TipoViatura): Observable<any> {
      return this.http.post<TipoViatura>(
                      `${this.tipoViaturasUrl}/salvar`, value);
    }

    update(value: TipoViatura): Observable<any> {
      return this.http.put(
                      `${this.tipoViaturasUrl}/${value.id}`, value);
    }

    delete(id: number): Observable<any> {
      return this.http.delete(
                      `${this.tipoViaturasUrl}/${id}`);
  }

  getBuscarTipoViauraAtivas() {
    return this.http.get<TipoViatura[]>(
                    `${this.tipoViaturasUrl}/ativos`);
  }

}
