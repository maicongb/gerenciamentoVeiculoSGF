import { Component, Input, Optional, Self } from "@angular/core";
import { NgControl } from '@angular/forms';
import { InputCommon } from '../input.common';

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss'],
})
export class DateComponent extends InputCommon {

    @Input()
    minDate = null;

    constructor(@Optional() @Self() public ngControl: NgControl) {
        super(ngControl);
    }
}
