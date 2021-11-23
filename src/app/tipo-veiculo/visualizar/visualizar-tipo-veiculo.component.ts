import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

import { TipoVeiculoService } from './../tipo-veiculo.service';

@Component({
  selector: 'app-visualizar-tipo-veiculo',
  templateUrl: './visualizar-tipo-veiculo.component.html',
  styleUrls: ['./visualizar-tipo-veiculo.component.scss']
})
export class VisualizarTipoVeiculoComponent implements OnInit {
    form = this.formBuilder.group({
        nome:[null],
        ativo:[null],
    });

    constructor(
        private tipoVeiculoService: TipoVeiculoService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                map((params) => params.get('id')),
                filter((id) => id != null),
                switchMap((id) => this.tipoVeiculoService.get(id))
            )
            .subscribe((value) => {
                this.form.patchValue(value);
            });
    }
}
