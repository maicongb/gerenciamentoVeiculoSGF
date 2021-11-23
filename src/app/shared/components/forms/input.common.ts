import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    NgControl,
    ValidationErrors,
    Validator,
} from '@angular/forms';
import { Directive, HostListener, Input, OnInit } from '@angular/core';

@Directive()
export class InputCommon implements ControlValueAccessor, OnInit {
    @Input()
    label: string;

    @Input()
    required = false;

    @Input()
    help: string = null;

    @Input()
    errors: { [key: string]: string } = null;

    control = new FormControl();

    onChange = (_) => {};

    onTouched = () => {};

    constructor(public ngControl: NgControl) {
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {
        const validators = this.ngControl.control.validator;
        this.control.setValidators(validators ? validators : null);
        this.control.updateValueAndValidity();
    }

    writeValue(obj: any): void {
        this.control.setValue(obj);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }

    handleInput(): void {
        this.onChange(this.control.value);
    }

    @HostListener('ngModelChange', ['$event'])
    handleReset(value) {
        if (!value) {
            this.control.reset();
        }
    }
}
