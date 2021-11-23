import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmarDialogParams {
    title: string;
    message: string;
}

@Component({
    selector: 'app-confirmar-dialog',
    templateUrl: './confirmar-dialog.component.html',
    styleUrls: ['./confirmar-dialog.component.scss'],
})
export class ConfirmarDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public params: ConfirmarDialogParams
    ) {}
}
