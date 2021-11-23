import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacaoService } from './../../core/service/notificacao.service';
import { TipoVeiculoService } from './../tipo-veiculo.service';
import { TipoVeiculo } from './../models/tipo-veiculo.model';


@Component({
  selector: 'app-cadastrar-tipo-veiculo',
  templateUrl: './cadastrar-tipo-veiculo.component.html',
  styleUrls: ['./cadastrar-tipo-veiculo.component.scss']
})
export class CadastrarTipoVeiculoComponent implements OnInit {

    isHidden: boolean = false;

    constructor(
        private tipoVeiculoService: TipoVeiculoService,
        private notificacao: NotificacaoService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    handleSubmit(value: TipoVeiculo) {
        this.tipoVeiculoService.save(value).subscribe(
            (response) => {
              this.notificacao.success('Dados salvos com sucesso!');
              this.router.navigate(['/tipo-veiculo']);
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
