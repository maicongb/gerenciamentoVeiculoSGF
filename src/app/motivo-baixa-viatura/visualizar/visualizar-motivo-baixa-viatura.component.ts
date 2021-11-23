import { MotivoBaixaViaturaService } from './../motivo-baixa-viatura.services';
import { map, filter, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-motivo-baixa-viatura',
  templateUrl: './visualizar-motivo-baixa-viatura.component.html',
  styleUrls: ['./visualizar-motivo-baixa-viatura.component.scss']
})
export class VisualizarMotivoBaixaViaturaComponent implements OnInit {

  form = this.formBuilder.group({
      nome:[null],
      ativo:[null],
  });

  constructor(
      private motivoBaixaViaturaService: MotivoBaixaViaturaService,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
      this.route.paramMap
          .pipe(
              map((params) => params.get('id')),
              filter((id) => id != null),
              switchMap((id) => this.motivoBaixaViaturaService.get(id))
          )
          .subscribe((value) => {
              this.form.patchValue(value);
          });
  }

}
