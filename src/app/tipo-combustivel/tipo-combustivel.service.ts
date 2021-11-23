import { TipoCombustivel } from './models/tipo-combustivel.model';
import { TipoCombustivelFilter } from './models/tipo-combustivel-filter.model';
import { environment } from '../../environments/environment';
import { PagedCollectionResponse } from '../core/service/models/collection-response.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../core/service/api.service';



@Injectable({
  providedIn: 'root'
})
export class TipoCombustivelService {

    tipoCombustivelUrl: string;
    
    constructor(private api: ApiService, private http: HttpClient) {
        this.tipoCombustivelUrl = `${environment.api_url}/tipo-combustivel`;
     }

    find(
        sort: string,
        order: string,
        page: number,
        size: number,
        filter: TipoCombustivelFilter

    ): Observable<PagedCollectionResponse<TipoCombustivel>> {
        return this.http.post<PagedCollectionResponse<TipoCombustivel>>(              
                this.tipoCombustivelUrl,
                filter,
                {
                    params: new HttpParams()
                        .append('sort', `${sort},${order}`)
                        .append('page', String(page))
                        .append('size', String(size)),
                }
            )   
        }

    get(id: string): Observable<TipoCombustivel> {
        return this.http.get<TipoCombustivel>(
                        `${this.tipoCombustivelUrl}/${id}`);
    }

    save(value: TipoCombustivel): Observable<any> {
        return this.http.post<TipoCombustivel>(
                        `${this.tipoCombustivelUrl}/salvar`, value);
    }

    update(value: TipoCombustivel): Observable<any> {
        return this.http.put(
                        `${this.tipoCombustivelUrl}/${value.id}`, value);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(
                        `${this.tipoCombustivelUrl}/${id}`);
    }

    getBuscarTipoCombustivelAtivos() {
        return this.http.get<TipoCombustivel[]>(
                        `${this.tipoCombustivelUrl}/ativos`);
      }

}
