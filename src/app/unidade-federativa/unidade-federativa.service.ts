import { UnidadeFederativa } from './models/unidade-federativa.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../core/service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnidadeFederativaService {

  unidadeFederativaUrl: string;
      
  constructor(private api: ApiService, private http: HttpClient) {
      this.unidadeFederativaUrl = 
              `${environment.api_url}/unidade-federativa`;
  }

  getBuscarUnidadeFederativaAtivas() {
    return this.http.get<UnidadeFederativa[]>(
                    `${this.unidadeFederativaUrl}/ativas`);
  }

}
