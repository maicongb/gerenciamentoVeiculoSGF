import { CategoriaVeiculo } from './../models/categoria-veiculo.model';
import { Router } from '@angular/router';
import { NotificacaoService } from 'src/app/core/service/notificacao.service';
import { CategoriaVeiculoService } from './../categoria-veiculo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-categoria-veiculo',
  templateUrl: './cadastrar-categoria-veiculo.component.html',
  styleUrls: ['./cadastrar-categoria-veiculo.component.scss']
})
export class CadastrarCategoriaVeiculoComponent implements OnInit {

    isHidden: boolean = false;

    constructor(
        private categoriaVeiculoService: CategoriaVeiculoService,
        private notificacao: NotificacaoService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    handleSubmit(value: CategoriaVeiculo) {
      this.categoriaVeiculoService.save(value).subscribe(
          (response) => {
            this.notificacao.success('Dados salvos com sucesso!');
            this.router.navigate(['/categoria-veiculo']);
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
