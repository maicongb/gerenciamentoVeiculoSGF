import { Component, Input, Optional, Self } from '@angular/core';
import { FormGroupName, NgControl } from '@angular/forms';
import { InputCommon } from '../input.common';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class SelectComponent extends InputCommon {

    constructor(@Optional() @Self() public ngControl: NgControl) {
        super(ngControl);
    }

    @Input()
    displayProperty = 'nome';

    @Input()
    multiple = false;

    @Input()
    opcoes: any[] = [];

    @Input()
    compareWith: (a: any, b: any) => boolean = (a, b) => {
        return a && b ? a.id === b.id : a === b;
    }
}
