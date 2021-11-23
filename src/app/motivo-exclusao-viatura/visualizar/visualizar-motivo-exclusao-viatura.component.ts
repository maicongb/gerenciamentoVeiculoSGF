import { MotivoExclusaoViaturaService } from './../motivo-exclusao-viatura.services';
import { map, filter, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-motivo-exclusao-viatura',
  templateUrl: './visualizar-motivo-exclusao-viatura.component.html',
  styleUrls: ['./visualizar-motivo-exclusao-viatura.component.scss']
})
export class VisualizarMotivoExclusaoViaturaComponent implements OnInit {

    form = this.formBuilder.group({
        nome:[null],
        ativo:[null],
    });

    constructor(
        private motivoExclusaoViaturaService: MotivoExclusaoViaturaService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                map((params) => params.get('id')),
                filter((id) => id != null),
                switchMap((id) => this.motivoExclusaoViaturaService.get(id))
            )
            .subscribe((value) => {
                this.form.patchValue(value);
            });
    }

}
