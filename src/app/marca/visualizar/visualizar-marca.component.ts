import { map, filter, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MarcaService } from './../marca.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-marca',
  templateUrl: './visualizar-marca.component.html',
  styleUrls: ['./visualizar-marca.component.scss']
})
export class VisualizarMarcaComponent implements OnInit {

    form = this.formBuilder.group({
        nome: [null],
        tipoVeiculo: this.formBuilder.group({
            nome: [null]
        }),
        ativo: [null],
        
    });

    constructor(
        private marcaService: MarcaService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {

        this.route.paramMap
              .pipe(
                  map((params) => params.get('id')),
                  filter((id) => id != null),
                  switchMap((id) => this.marcaService.get(id))
              )
              .subscribe((value) => {
                  this.form.patchValue(value);
              });
    }


}
