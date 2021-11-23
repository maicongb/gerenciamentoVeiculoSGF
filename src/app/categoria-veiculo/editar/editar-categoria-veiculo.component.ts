import { map, filter, switchMap } from 'rxjs/operators';
import { CategoriaVeiculoService } from './../categoria-veiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from 'src/app/core/service/notificacao.service';
import { CategoriaVeiculo } from './../models/categoria-veiculo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-categoria-veiculo',
  templateUrl: './editar-categoria-veiculo.component.html',
  styleUrls: ['./editar-categoria-veiculo.component.scss']
})
export class EditarCategoriaVeiculoComponent implements OnInit {

      categoriaVeiculo: CategoriaVeiculo = null; 
      isHidden: boolean = true;

      constructor(
          private notificacao: NotificacaoService,
          private route: ActivatedRoute,
          private router: Router,
          private categoriaVeiculoService: CategoriaVeiculoService
      ) { }

      ngOnInit(): void {
          this.route.paramMap
          .pipe(
                map((params) => params.get('id')),
                filter((id) => id != null),
                switchMap((id) => this.categoriaVeiculoService.get(id))
          )
          .subscribe((value) => (this.categoriaVeiculo = value));
      }

      handleSubmit(value: CategoriaVeiculo) {
        Object.assign(this.categoriaVeiculo, value);

          if(this.categoriaVeiculo.ativo) {
              this.categoriaVeiculo.ativo = 1;
          } else {
              this.categoriaVeiculo.ativo = 0;
          }
        

        this.categoriaVeiculoService.update(this.categoriaVeiculo).subscribe(
            (response) => {
                this.router.navigate(['/categoria-veiculo']);
                this.notificacao.success('Dados atualizados com sucesso!');
            },
            (response) => {
              if (response?.error?.errors) {
                  for (const erro of response?.error?.errors) {
                      this.notificacao.error(erro.defaultMessage);
                  }

              } else if (response?.error?.userMessage) {
                this.notificacao.error(response.error.userMessage);
                }
            }
        );
      }

}
