import { TipoVistoria } from './models/tipo-vistoria.model';
import { TipoVistoriaFilter } from './models/tipo-vistoria-filter.model';
import { Observable } from 'rxjs';
import { PagedCollectionResponse } from '../core/service/models/collection-response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from '../core/service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoVistoriaService {

    tipoVistoriasUrl: string;
    
    constructor(private api: ApiService, private http: HttpClient) {
        this.tipoVistoriasUrl = `${environment.api_url}/tipo-vistoria`;
    }

    find(
      sort: string,
      order: string,
      page: number,
      size: number,
      filter: TipoVistoriaFilter

    ): Observable<PagedCollectionResponse<TipoVistoria>> {
      return this.http.post<PagedCollectionResponse<TipoVistoria>>(              
              this.tipoVistoriasUrl,
              filter,
              {
                  params: new HttpParams()
                      .append('sort', `${sort},${order}`)
                      .append('page', String(page))
                      .append('size', String(size)),
              }
          )   
      }

    get(id: string): Observable<TipoVistoria> {
        return this.http.get<TipoVistoria>(
                        `${this.tipoVistoriasUrl}/${id}`);
    }

    save(value: TipoVistoria): Observable<any> {
      return this.http.post<TipoVistoria>(
                      `${this.tipoVistoriasUrl}/salvar`, value);
    }

    update(value: TipoVistoria): Observable<any> {
      return this.http.put(
                      `${this.tipoVistoriasUrl}/${value.id}`, value);
    }

    delete(id: number): Observable<any> {
      return this.http.delete(
                      `${this.tipoVistoriasUrl}/${id}`);
    }

    getTipoVistoria() {
      return this.http.get<TipoVistoria[]>(
                      `${this.tipoVistoriasUrl}/ativas`);
    }

}
