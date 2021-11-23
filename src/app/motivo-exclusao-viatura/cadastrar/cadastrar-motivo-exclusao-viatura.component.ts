import { MotivoExclusaoViatura } from './../models/motivo-exclusao-viatura.model';
import { MotivoExclusaoViaturaService } from './../motivo-exclusao-viatura.services';
import { NotificacaoService } from '../../core/service/notificacao.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cadastrar-motivo-exclusao-viatura',
  templateUrl: './cadastrar-motivo-exclusao-viatura.component.html',
  styleUrls: ['./cadastrar-motivo-exclusao-viatura.component.scss']
})
export class CadastrarMotivoExclusaoViaturaComponent implements OnInit {

    isHidden: boolean = false;

    constructor(
        private motivoExclusaoViaturaService: MotivoExclusaoViaturaService,
        private notificacao: NotificacaoService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    handleSubmit(value: MotivoExclusaoViatura) {
      this.motivoExclusaoViaturaService.save(value).subscribe(
          (response) => {
            this.notificacao.success('Dados salvos com sucesso!');
            this.router.navigate(['/motivo-exclusao-viatura']);
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
