import { map, filter, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriaVeiculoService } from './../categoria-veiculo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-categoria-veiculo',
  templateUrl: './visualizar-categoria-veiculo.component.html',
  styleUrls: ['./visualizar-categoria-veiculo.component.scss']
})
export class VisualizarCategoriaVeiculoComponent implements OnInit {

      form = this.formBuilder.group({
          nome:[null],
          ativo:[null],
      });

      constructor(
          private categoriaVeiculoService: CategoriaVeiculoService,
          private route: ActivatedRoute,
          private formBuilder: FormBuilder
      ) {}

      ngOnInit(): void {
          this.route.paramMap
              .pipe(
                  map((params) => params.get('id')),
                  filter((id) => id != null),
                  switchMap((id) => this.categoriaVeiculoService.get(id))
              )
              .subscribe((value) => {
                  this.form.patchValue(value);
              });
      }

}
