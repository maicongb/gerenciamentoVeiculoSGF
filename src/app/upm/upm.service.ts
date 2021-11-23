import { Upm } from './models/upm.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../core/service/api.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpmService {

  upmUrl: string;
      
  constructor(private api: ApiService, private http: HttpClient) {
      this.upmUrl = 
              `${environment.api_url}/unidade-policial-militar`;
  }

  getBuscarUpmsAtivas() {
    return this.http.get<Upm[]>(
                    `${this.upmUrl}/ativas`);
  }
}
