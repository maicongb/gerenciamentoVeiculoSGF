import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './models/api.model';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private api$: Observable<Api>;

    constructor(private http: HttpClient) {}

    getApi(): Observable<Api> {
        if (this.api$ == null) {
            this.api$ = this.http
                .get<Api>(`${environment.api_url}`)
                
                .pipe(shareReplay(1));
        }
        return this.api$;
    }
}
