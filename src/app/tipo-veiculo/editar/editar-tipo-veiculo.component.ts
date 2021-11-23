import { map, filter, switchMap } from 'rxjs/operators';
import { TipoVeiculoService } from './../tipo-veiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from './../../core/service/notificacao.service';
import { TipoVeiculo } from './../models/tipo-veiculo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-tipo-veiculo',
  templateUrl: './editar-tipo-veiculo.component.html',
  styleUrls: ['./editar-tipo-veiculo.component.scss']
})
export class EditarTipoVeiculoComponent implements OnInit {

    tipoVeiculo: TipoVeiculo = null; 
    isHidden: boolean = true;

    constructor(
        private notificacao: NotificacaoService,
        private route: ActivatedRoute,
        private router: Router,
        private tipoVeiculoService: TipoVeiculoService
    ) { }

    ngOnInit(): void {
        this.route.paramMap
        .pipe(
              map((params) => params.get('id')),
              filter((id) => id != null),
              switchMap((id) => this.tipoVeiculoService.get(id))
        )
        .subscribe((value) => (this.tipoVeiculo = value));
    }

    handleSubmit(value: TipoVeiculo) {
      Object.assign(this.tipoVeiculo, value);

        if(this.tipoVeiculo.ativo) {
            this.tipoVeiculo.ativo = 1;
        } else {
            this.tipoVeiculo.ativo = 0;
        }
       

      this.tipoVeiculoService.update(this.tipoVeiculo).subscribe(
          (response) => {
              this.router.navigate(['/tipo-veiculo']);
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


