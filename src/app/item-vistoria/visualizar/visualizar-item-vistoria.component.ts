import { map, filter, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemVistoriaService } from './../item-vistoria.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-item-vistoria',
  templateUrl: './visualizar-item-vistoria.component.html',
  styleUrls: ['./visualizar-item-vistoria.component.scss']
})
export class VisualizarItemVistoriaComponent implements OnInit {

      form = this.formBuilder.group({
          nome: [null],
          tipoVistoria: this.formBuilder.group({
              nome: [null]
          }),
          ativo: [null],
          
      });

      constructor(
          private itemVistoriaService: ItemVistoriaService,
          private route: ActivatedRoute,
          private formBuilder: FormBuilder
      ) { }

      ngOnInit(): void {

          this.route.paramMap
                .pipe(
                    map((params) => params.get('id')),
                    filter((id) => id != null),
                    switchMap((id) => this.itemVistoriaService.get(id))
                )
                .subscribe((value) => {
                    this.form.patchValue(value);
                });
      }

}
