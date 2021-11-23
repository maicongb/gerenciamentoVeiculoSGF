import { ItemVistoria } from './models/item-vistoria.model';
import { ItemVistoriaFilter } from './models/item-vistoria-filter.model';
import { Observable } from 'rxjs';
import { PagedCollectionResponse } from '../core/service/models/collection-response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from '../core/service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemVistoriaService {

    itemVistoriaViaturasUrl: string;
    
    constructor(private api: ApiService, private http: HttpClient) {
        this.itemVistoriaViaturasUrl = 
                `${environment.api_url}/item-vistoria`;
    }

    find(
      sort: string,
      order: string,
      page: number,
      size: number,
      filter: ItemVistoriaFilter

    ): Observable<PagedCollectionResponse<ItemVistoria>> {
      return this.http.post<PagedCollectionResponse<ItemVistoria>>(              
              this.itemVistoriaViaturasUrl,
              filter,
              {
                  params: new HttpParams()
                      .append('sort', `${sort},${order}`)
                      .append('page', String(page))
                      .append('size', String(size)),
              }
          )   
      }

    get(id: string): Observable<ItemVistoria> {
        return this.http.get<ItemVistoria>(
                        `${this.itemVistoriaViaturasUrl}/${id}`);
    }

    save(value: ItemVistoria): Observable<any> {
      return this.http.post<ItemVistoria>(
                      `${this.itemVistoriaViaturasUrl}/salvar`, value);
    }

    update(value: ItemVistoria): Observable<any> {
      return this.http.put(
                      `${this.itemVistoriaViaturasUrl}/${value.id}`, value);
    }

    delete(id: number): Observable<any> {
      return this.http.delete(
                      `${this.itemVistoriaViaturasUrl}/${id}`);
  }

}
