import { Router } from '@angular/router';
import { NotificacaoService } from './../../core/service/notificacao.service';
import { TipoCombustivelService } from './../tipo-combustivel.service';
import { Component, OnInit } from '@angular/core';
import { TipoCombustivel } from '../models/tipo-combustivel.model';

@Component({
  selector: 'app-cadastrar-tipo-combustivel',
  templateUrl: './cadastrar-tipo-combustivel.component.html',
  styleUrls: ['./cadastrar-tipo-combustivel.component.scss']
})
export class CadastrarTipoCombustivelComponent implements OnInit {

      isHidden: boolean = false;

      constructor(
          private tipoCombustivelService: TipoCombustivelService,
          private notificacao: NotificacaoService,
          private router: Router
      ) { }

      ngOnInit(): void {
      }

      handleSubmit(value: TipoCombustivel) {
          this.tipoCombustivelService.save(value).subscribe(
              (response) => {
                this.notificacao.success('Dados salvos com sucesso!');
                this.router.navigate(['/tipo-combustivel']);
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

