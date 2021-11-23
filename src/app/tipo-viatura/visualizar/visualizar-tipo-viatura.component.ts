import { map, filter, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TipoViaturaService } from './../tipo-viatura.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-tipo-viatura',
  templateUrl: './visualizar-tipo-viatura.component.html',
  styleUrls: ['./visualizar-tipo-viatura.component.scss']
})
export class VisualizarTipoViaturaComponent implements OnInit {

  form = this.formBuilder.group({
      nome:[null],
      ativo:[null],
  });

  constructor(
      private tipoViaturaService: TipoViaturaService,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
      this.route.paramMap
          .pipe(
              map((params) => params.get('id')),
              filter((id) => id != null),
              switchMap((id) => this.tipoViaturaService.get(id))
          )
          .subscribe((value) => {
              this.form.patchValue(value);
          });
  }

}
