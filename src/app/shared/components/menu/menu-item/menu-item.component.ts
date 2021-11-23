import { Component, Input } from '@angular/core';
import { MenuDefinition } from '../menu-definition';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
    @Input()
    item: MenuDefinition;

    @Input()
    subitem = false;

    constructor() {}
}
