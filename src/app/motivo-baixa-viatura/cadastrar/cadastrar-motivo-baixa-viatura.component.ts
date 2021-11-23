import { MotivoBaixaViatura } from './../models/motivo-baixa-viatura.model';
import { MotivoBaixaViaturaService } from './../motivo-baixa-viatura.services';
import { NotificacaoService } from '../../core/service/notificacao.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cadastrar-motivo-baixa-viatura',
  templateUrl: './cadastrar-motivo-baixa-viatura.component.html',
  styleUrls: ['./cadastrar-motivo-baixa-viatura.component.scss']
})
export class CadastrarMotivoBaixaViaturaComponent implements OnInit {

    isHidden: boolean = false;

    constructor(
        private motivoBaixaViaturaService: MotivoBaixaViaturaService,
        private notificacao: NotificacaoService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    handleSubmit(value: MotivoBaixaViatura) {
      this.motivoBaixaViaturaService.save(value).subscribe(
          (response) => {
            this.notificacao.success('Dados salvos com sucesso!');
            this.router.navigate(['/motivo-baixa-viatura']);
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
