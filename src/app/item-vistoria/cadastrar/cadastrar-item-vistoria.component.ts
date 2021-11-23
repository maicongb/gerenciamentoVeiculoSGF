import { TipoVistoria } from 'src/app/tipo-vistoria/models/tipo-vistoria.model';
import { Observable } from 'rxjs';
import { ItemVistoria } from './../models/item-vistoria.model';
import { Router } from '@angular/router';
import { NotificacaoService } from './../../core/service/notificacao.service';
import { ItemVistoriaService } from './../item-vistoria.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-item-vistoria',
  templateUrl: './cadastrar-item-vistoria.component.html',
  styleUrls: ['./cadastrar-item-vistoria.component.scss']
})
export class CadastrarItemVistoriaComponent implements OnInit {

      isHidden: boolean = false;

      constructor(
          private itemVistoriaService: ItemVistoriaService,
          private notificacao: NotificacaoService,
          private router: Router
      ) { }

      ngOnInit(): void {
      }

      handleSubmit(value: ItemVistoria) {
        this.itemVistoriaService.save(value).subscribe(
            (response) => {
              this.notificacao.success('Dados salvos com sucesso!');
              this.router.navigate(['/item-vistoria']);
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


