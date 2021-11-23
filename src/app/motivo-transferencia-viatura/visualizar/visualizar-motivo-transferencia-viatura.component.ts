import { MotivoTransferenciaViaturaService } from './../motivo-transferencia-viatura.services';
import { map, filter, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-motivo-transferencia-viatura',
  templateUrl: './visualizar-motivo-transferencia-viatura.component.html',
  styleUrls: ['./visualizar-motivo-transferencia-viatura.component.scss']
})
export class VisualizarMotivoTransferenciaViaturaComponent implements OnInit {

    form = this.formBuilder.group({
        nome:[null],
        ativo:[null],
    });

    constructor(
        private motivoTransferenciaViaturaService: MotivoTransferenciaViaturaService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                map((params) => params.get('id')),
                filter((id) => id != null),
                switchMap((id) => this.motivoTransferenciaViaturaService.get(id))
            )
            .subscribe((value) => {
                this.form.patchValue(value);
            });
    }

}
