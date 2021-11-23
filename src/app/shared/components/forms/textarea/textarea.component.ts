import { Component, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { InputCommon } from '../input.common';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent extends InputCommon {
    @Input()
    maxlength = 2000;

    constructor(@Optional() @Self() public ngControl: NgControl) {
        super(ngControl);
    }
}
