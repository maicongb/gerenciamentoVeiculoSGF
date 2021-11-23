import { Viatura } from './models/viatura.model';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { Observable } from 'rxjs';
import { ViaturaFilter } from './models/viatura-filter.model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from './../core/service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViaturaService {

    viaturaUrl: string;
            
    constructor(private api: ApiService, private http: HttpClient) {
        this.viaturaUrl = 
                `${environment.api_url}/viatura`;
    }

    find(
      sort: string,
      order: string,
      page: number,
      size: number,
      filter: ViaturaFilter

    ): Observable<PagedCollectionResponse<Viatura>> {
    return this.http.post<PagedCollectionResponse<Viatura>>(              
            this.viaturaUrl,
            filter,
            {
                params: new HttpParams()
                    .append('sort', `${sort},${order}`)
                    .append('page', String(page))
                    .append('size', String(size)),
            }
        )   
    }

    get(id: string): Observable<Viatura> {
        return this.http.get<Viatura>(
                        `${this.viaturaUrl}/${id}`);
                        
    }

    save(value: Viatura): Observable<any> {
      return this.http.post<Viatura>(
                      `${this.viaturaUrl}/salvar`, value);
    }

    update(value: Viatura): Observable<any> {
      return this.http.put(
                      `${this.viaturaUrl}/${value.id}`, value);
    }

    delete(id: string): Observable<any> {
      return this.http.delete(
                      `${this.viaturaUrl}/${id}`);
    }

}
