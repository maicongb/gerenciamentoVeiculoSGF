import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MenuDefinition } from './menu-definition';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private sidebarToggle$ = new Subject<boolean>();
    private isExpanded = false;

    toggleState(): void {
        this.setExpanded(!this.isExpanded);
    }

    toggleItemState(value: MenuDefinition): void {
        value.isExpanded = !value.isExpanded;
    }

    setExpanded(value: boolean): void {
        this.isExpanded = value;
        this.sidebarToggle$.next(this.isExpanded);
    }

    get sidebarToggle(): Observable<boolean> {
        return this.sidebarToggle$;
    }
}
