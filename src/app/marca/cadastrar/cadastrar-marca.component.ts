import { MarcaVeiculo } from './../models/marca.model';
import { Router } from '@angular/router';
import { NotificacaoService } from './../../core/service/notificacao.service';
import { MarcaService } from './../marca.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-marca',
  templateUrl: './cadastrar-marca.component.html',
  styleUrls: ['./cadastrar-marca.component.scss']
})
export class CadastrarMarcaComponent implements OnInit {

    isHidden: boolean = false;

    constructor(
        private marcaService: MarcaService,
        private notificacao: NotificacaoService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    handleSubmit(value: MarcaVeiculo) {
      this.marcaService.save(value).subscribe(
          (response) => {
            this.notificacao.success('Dados salvos com sucesso!');
            this.router.navigate(['/marca-veiculo']);
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
