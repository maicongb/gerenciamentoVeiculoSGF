import { Component, Input, OnInit } from '@angular/core';
import { MenuDefinition } from './menu-definition';
import { MenuService } from './menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    @Input()
    itens: MenuDefinition[];

    @Input()
    forceExpanded = false;

    isExpanded = false;

    constructor(public menuService: MenuService) {}

    ngOnInit(): void {
        this.isExpanded = this.forceExpanded;
        this.menuService.sidebarToggle.subscribe((isExpanded: boolean) => {
            this.isExpanded = isExpanded || this.forceExpanded;
            if (!this.isExpanded && this.itens) {
                this.itens.forEach((x) => (x.isExpanded = false));
            }
        });
    }
}
