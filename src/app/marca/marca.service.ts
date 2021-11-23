import { MarcaFilter } from './models/marca-filter.model';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { MarcaVeiculo } from './models/marca.model';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from './../core/service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

    marcaUrl: string;
      
    constructor(private api: ApiService, private http: HttpClient) {
        this.marcaUrl = 
                `${environment.api_url}/marca-veiculo`;
    }

    find(
      sort: string,
      order: string,
      page: number,
      size: number,
      filter: MarcaFilter

    ): Observable<PagedCollectionResponse<MarcaVeiculo>> {
      return this.http.post<PagedCollectionResponse<MarcaVeiculo>>(              
              this.marcaUrl,
              filter,
              {
                  params: new HttpParams()
                      .append('sort', `${sort},${order}`)
                      .append('page', String(page))
                      .append('size', String(size)),
              }
          )   
      }

    get(id: string): Observable<MarcaVeiculo> {
        return this.http.get<MarcaVeiculo>(
                        `${this.marcaUrl}/${id}`);
    }

    save(value: MarcaVeiculo): Observable<any> {
      return this.http.post<MarcaVeiculo>(
                      `${this.marcaUrl}/salvar`, value);
    }

    update(value: MarcaVeiculo): Observable<any> {
      return this.http.put(
                      `${this.marcaUrl}/${value.id}`, value);
    }

    delete(id: number): Observable<any> {
      return this.http.delete(
                      `${this.marcaUrl}/${id}`);
    }

    getMarca() {
      return this.http.get<MarcaVeiculo[]>(
                      `${this.marcaUrl}/ativas`);
    }

}

