import { TipoVistoria } from './../models/tipo-vistoria.model';
import { Router } from '@angular/router';
import { NotificacaoService } from './../../core/service/notificacao.service';
import { TipoVistoriaService } from './../tipo-vistoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-tipo-vistoria',
  templateUrl: './cadastrar-tipo-vistoria.component.html',
  styleUrls: ['./cadastrar-tipo-vistoria.component.scss']
})
export class CadastrarTipoVistoriaComponent implements OnInit {

    isHidden: boolean = false;

    constructor(
        private tipoVistoriaService: TipoVistoriaService,
        private notificacao: NotificacaoService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    handleSubmit(value: TipoVistoria) {
      this.tipoVistoriaService.save(value).subscribe(
          (response) => {
            this.notificacao.success('Dados salvos com sucesso!');
            this.router.navigate(['/tipo-vistoria']);
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
