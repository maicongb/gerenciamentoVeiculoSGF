import { CategoriaVeiculo } from './models/categoria-veiculo.model';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { Observable } from 'rxjs';
import { CategoriaVeiculoFilter } from './models/categoria-veiculo-filter.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ApiService } from './../core/service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaVeiculoService {

    categoriaVeiculosUrl: string;
      
    constructor(private api: ApiService, private http: HttpClient) {
        this.categoriaVeiculosUrl = `${environment.api_url}/categoria-veiculo`;
    }

    find(
      sort: string,
      order: string,
      page: number,
      size: number,
      filter: CategoriaVeiculoFilter

    ): Observable<PagedCollectionResponse<CategoriaVeiculo>> {
      return this.http.post<PagedCollectionResponse<CategoriaVeiculo>>(              
              this.categoriaVeiculosUrl,
              filter,
              {
                  params: new HttpParams()
                      .append('sort', `${sort},${order}`)
                      .append('page', String(page))
                      .append('size', String(size)),
              }
          )   
      }

    get(id: string): Observable<CategoriaVeiculo> {
        return this.http.get<CategoriaVeiculo>(
                      `${this.categoriaVeiculosUrl}/${id}`);
    }

    save(value: CategoriaVeiculo): Observable<any> {
      return this.http.post<CategoriaVeiculo>(
                      `${this.categoriaVeiculosUrl}/salvar`, value);
    }

    update(value: CategoriaVeiculo): Observable<any> {
      return this.http.put(
                      `${this.categoriaVeiculosUrl}/${value.id}`, value);
    }

    delete(id: number): Observable<any> {
      return this.http.delete(
                      `${this.categoriaVeiculosUrl}/${id}`);
    }

    getCategoria() {
      return this.http.get<CategoriaVeiculo[]>(
                      `${this.categoriaVeiculosUrl}/ativas`);
    }


}
