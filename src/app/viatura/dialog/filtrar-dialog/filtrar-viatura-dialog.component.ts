import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-filtrar-viatura-dialog',
  templateUrl: './filtrar-viatura-dialog.component.html',
  styleUrls: ['./filtrar-viatura-dialog.component.scss']
})
export class FiltrarViaturaDialogComponent implements OnInit {

    form = this.fb.group({
      prefixo: null,
      tombamento: null,
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
