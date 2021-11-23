import { environment } from './../../environments/environment';
import { TipoVeiculo } from './models/tipo-veiculo.model';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { TipoVeiculoFilter } from './models/tipo-veiculo-filter.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from './../core/service/api.service';



@Injectable({
  providedIn: 'root'
})
export class TipoVeiculoService {

    tipoVeiculosUrl: string;
    
    constructor(private api: ApiService, private http: HttpClient) {
        this.tipoVeiculosUrl = `${environment.api_url}/tipo-veiculo`;
     }

    find(
        sort: string,
        order: string,
        page: number,
        size: number,
        filter: TipoVeiculoFilter

    ): Observable<PagedCollectionResponse<TipoVeiculo>> {
        return this.http.post<PagedCollectionResponse<TipoVeiculo>>(              
                this.tipoVeiculosUrl,
                filter,
                {
                    params: new HttpParams()
                        .append('sort', `${sort},${order}`)
                        .append('page', String(page))
                        .append('size', String(size)),
                }
            )   
        }

    get(id: string): Observable<TipoVeiculo> {
        return this.http.get<TipoVeiculo>(
                        `${this.tipoVeiculosUrl}/${id}`);
    }

    save(value: TipoVeiculo): Observable<any> {
        return this.http.post<TipoVeiculo>(
                        `${this.tipoVeiculosUrl}/salvar`, value);
    }

    update(value: TipoVeiculo): Observable<any> {
        return this.http.put(
                        `${this.tipoVeiculosUrl}/${value.id}`, value);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(
                        `${this.tipoVeiculosUrl}/${id}`);
    }

    getTipoVeiculo() {
        return this.http.get<TipoVeiculo[]>(
                        `${this.tipoVeiculosUrl}/ativos`);
    }

}
