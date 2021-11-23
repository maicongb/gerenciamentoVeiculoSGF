import { NotificacaoService } from './../../core/service/notificacao.service';
import { ModeloVeiculo } from './../models/modelo.model';
import { ModeloService } from './../modelo.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-modelo',
  templateUrl: './cadastrar-modelo.component.html',
  styleUrls: ['./cadastrar-modelo.component.scss']
})
export class CadastrarModeloComponent implements OnInit {

    isHidden: boolean = false;

    constructor(
        private modeloService: ModeloService,
        private notificacao: NotificacaoService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    handleSubmit(value: ModeloVeiculo) {
      this.modeloService.save(value).subscribe(
          (response) => {
            this.notificacao.success('Dados salvos com sucesso!');
            this.router.navigate(['/modelo-veiculo']);
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
