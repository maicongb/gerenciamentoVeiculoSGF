import { Viatura } from './../models/viatura.model';
import { Router } from '@angular/router';
import { NotificacaoService } from './../../core/service/notificacao.service';
import { ViaturaService } from './../viatura.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-viatura',
  templateUrl: './cadastrar-viatura.component.html',
  styleUrls: ['./cadastrar-viatura.component.scss']
})
export class CadastrarViaturaComponent implements OnInit {

  isHidden: boolean = false;

  constructor(
      private viaturaService: ViaturaService,
      private notificacao: NotificacaoService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleSubmit(value: Viatura) {
    this.viaturaService.save(value).subscribe(
        (response) => {
          this.notificacao.success('Dados salvos com sucesso!');
          this.router.navigate(['/viatura']);
        },
        (response) => {
            if (response?.error?.objects) {
              this.notificacao.error(response.error.objects[0].userMessage);
            } else if (response?.error?.errors) {
                         
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