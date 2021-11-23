import { Component, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { InputCommon } from '../input.common';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent extends InputCommon {
    @Input()
    maxlength = 150;

    @Input()
    minlength: string = null;

    @Input()
    mask: string = null;

    @Input()
    thousandSeparator: string = null;

    @Input()
    type = 'text';

    constructor(@Optional() @Self() public ngControl: NgControl) {
        super(ngControl);
    }
}
