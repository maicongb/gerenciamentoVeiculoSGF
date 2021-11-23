import { map, filter, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModeloService } from './../../modelo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-modelo',
  templateUrl: './visualizar-modelo.component.html',
  styleUrls: ['./visualizar-modelo.component.scss']
})
export class VisualizarModeloComponent implements OnInit {

    form = this.formBuilder.group({
      nome:  [null],
      potencia: [null],
      tanque:  [null],
      marcaVeiculo: this.formBuilder.group({
          nome: [null],
      }),
      categoriaVeiculo: this.formBuilder.group({
        nome: [null],
    }),
      ativo: [null],
  });

    constructor(
        private modeloService: ModeloService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {

        this.route.paramMap
              .pipe(
                  map((params) => params.get('id')),
                  filter((id) => id != null),
                  switchMap((id) => this.modeloService.get(id))
              )
              .subscribe((value) => {
                  this.form.patchValue(value);
              });
    }

}
