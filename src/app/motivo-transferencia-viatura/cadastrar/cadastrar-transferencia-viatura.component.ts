import { MotivoTransferenciaViaturaService } from './../motivo-transferencia-viatura.services';
import { NotificacaoService } from '../../core/service/notificacao.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MotivoTransferenciaViatura } from '../models/motivo-transferencia-viatura.model';

@Component({
  selector: 'app-cadastrar-transferencia-viatura',
  templateUrl: './cadastrar-transferencia-viatura.component.html',
  styleUrls: ['./cadastrar-transferencia-viatura.component.scss']
})
export class CadastrarTransferenciaViaturaComponent implements OnInit {

  isHidden: boolean = false;

  constructor(
      private motivoTransferenciaViaturaService: MotivoTransferenciaViaturaService,
      private notificacao: NotificacaoService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleSubmit(value: MotivoTransferenciaViatura) {
    this.motivoTransferenciaViaturaService.save(value).subscribe(
        (response) => {
          this.notificacao.success('Dados salvos com sucesso!');
          this.router.navigate(['/motivo-transferencia-viatura']);
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

