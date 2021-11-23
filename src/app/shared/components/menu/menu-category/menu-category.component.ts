import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { MenuDefinition } from '../menu-definition';
import { MenuService } from '../menu.service';

@Component({
    selector: 'app-menu-category',
    templateUrl: './menu-category.component.html',
    styleUrls: ['./menu-category.component.scss'],
    animations: [
        trigger('expandHide', [
            state('expanded', style({})),
            state(
                'hidden',
                style({
                    height: '0',
                    overflow: 'hidden',
                })
            ),
            transition('hidden => expanded', [animate('0.15s')]),
            transition('expanded => hidden', [animate('0.15s')]),
        ]),
    ],
})
export class MenuCategoryComponent {
    @Input()
    item: MenuDefinition;

    @Input()
    expanded;

    constructor(public menuService: MenuService) {}
}
