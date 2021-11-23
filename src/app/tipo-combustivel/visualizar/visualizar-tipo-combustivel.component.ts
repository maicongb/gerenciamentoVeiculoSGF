import { map, filter, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TipoCombustivelService } from './../tipo-combustivel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-tipo-combustivel',
  templateUrl: './visualizar-tipo-combustivel.component.html',
  styleUrls: ['./visualizar-tipo-combustivel.component.scss']
})
export class VisualizarTipoCombustivelComponent implements OnInit {
  form = this.formBuilder.group({
    nome:[null],
    ativo:[null],
});

    constructor(
        private tipoCombustivelService: TipoCombustivelService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                map((params) => params.get('id')),
                filter((id) => id != null),
                switchMap((id) => this.tipoCombustivelService.get(id))
            )
            .subscribe((value) => {
                this.form.patchValue(value);
            });
    }
}
