import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { ModeloVeiculo } from './models/modelo.model';
import { ModeloFilter } from './models/modelo-filter.model';
import { environment } from './../../environments/environment';
import { ApiService } from './../core/service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

      modeloUrl: string;
          
      constructor(private api: ApiService, private http: HttpClient) {
          this.modeloUrl = 
                  `${environment
                    .api_url}/modelo-veiculo`;
      }

      find(
        sort: string,
        order: string,
        page: number,
        size: number,
        filter: ModeloFilter

      ): Observable<PagedCollectionResponse<ModeloVeiculo>> {
      return this.http.post<PagedCollectionResponse<ModeloVeiculo>>(              
              this.modeloUrl,
              filter,
              {
                  params: new HttpParams()
                      .append('sort', `${sort},${order}`)
                      .append('page', String(page))
                      .append('size', String(size)),
              }
          )   
      }

      get(id: string): Observable<ModeloVeiculo> {
          return this.http.get<ModeloVeiculo>(
                          `${this.modeloUrl}/${id}`);
      }

      save(value: ModeloVeiculo): Observable<any> {
        return this.http.post<ModeloVeiculo>(
                        `${this.modeloUrl}/salvar`, value);
      }

      update(value: ModeloVeiculo): Observable<any> {
        return this.http.put(
                        `${this.modeloUrl}/${value.id}`, value);
      }

      delete(id: number): Observable<any> {
        return this.http.delete(
                        `${this.modeloUrl}/${id}`);
      }

      getBuscarModelosVeiculosAtivos() {
        return this.http.get<ModeloVeiculo[]>(
                        `${this.modeloUrl}/ativos`);
      }

}
