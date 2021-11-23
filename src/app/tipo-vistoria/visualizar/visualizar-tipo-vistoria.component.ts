import { map, filter, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TipoVistoriaService } from './../tipo-vistoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-tipo-vistoria',
  templateUrl: './visualizar-tipo-vistoria.component.html',
  styleUrls: ['./visualizar-tipo-vistoria.component.scss']
})
export class VisualizarTipoVistoriaComponent implements OnInit {

    form = this.formBuilder.group({
        nome:[null],
        ativo:[null],
    });

    constructor(
        private tipoVistoriaService: TipoVistoriaService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                map((params) => params.get('id')),
                filter((id) => id != null),
                switchMap((id) => this.tipoVistoriaService.get(id))
            )
            .subscribe((value) => {
                this.form.patchValue(value);
            });
    }

}

