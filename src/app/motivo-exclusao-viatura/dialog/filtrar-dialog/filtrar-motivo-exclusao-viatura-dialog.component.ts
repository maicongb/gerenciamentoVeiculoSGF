import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-filtrar-motivo-exclusao-viatura-dialog',
  templateUrl: './filtrar-motivo-exclusao-viatura-dialog.component.html',
  styleUrls: ['./filtrar-motivo-exclusao-viatura-dialog.component.scss']
})
export class FiltrarMotivoExclusaoViaturaDialogComponent implements OnInit {

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
