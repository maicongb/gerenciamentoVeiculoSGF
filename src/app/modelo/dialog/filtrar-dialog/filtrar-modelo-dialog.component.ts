import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-filtrar-modelo-dialog',
  templateUrl: './filtrar-modelo-dialog.component.html',
  styleUrls: ['./filtrar-modelo-dialog.component.scss']
})
export class FiltrarModeloDialogComponent implements OnInit {

    form = this.fb.group({
      nome: null,
    });

    constructor(
      @Inject(MAT_DIALOG_DATA) private filter: any,
      private fb: FormBuilder
    ) { }

    ngOnInit(): void {
      if (this.filter) {
        this.form.patchValue(this.filter);
      }
    }

}
