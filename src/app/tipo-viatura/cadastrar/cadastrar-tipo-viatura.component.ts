import { NotificacaoService } from './../../core/service/notificacao.service';
import { TipoViaturaService } from './../tipo-viatura.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TipoViatura } from '../models/tipo-viatura.model';

@Component({
  selector: 'app-cadastrar-tipo-viatura',
  templateUrl: './cadastrar-tipo-viatura.component.html',
  styleUrls: ['./cadastrar-tipo-viatura.component.scss']
})
export class CadastrarTipoViaturaComponent implements OnInit {

    isHidden: boolean = false;

    constructor(
        private tipoViaturaService: TipoViaturaService,
        private notificacao: NotificacaoService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    handleSubmit(value: TipoViatura) {
      this.tipoViaturaService.save(value).subscribe(
          (response) => {
            this.notificacao.success('Dados salvos com sucesso!');
            this.router.navigate(['/tipo-viatura']);
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
