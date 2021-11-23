import { map, filter, switchMap } from 'rxjs/operators';
import { TipoCombustivelService } from './../tipo-combustivel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from './../../core/service/notificacao.service';
import { TipoCombustivel } from './../models/tipo-combustivel.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-tipo-combustivel',
  templateUrl: './editar-tipo-combustivel.component.html',
  styleUrls: ['./editar-tipo-combustivel.component.scss']
})
export class EditarTipoCombustivelComponent implements OnInit {

      tipoCombustivel: TipoCombustivel = null; 
      isHidden: boolean = true;

      constructor(
          private notificacao: NotificacaoService,
          private route: ActivatedRoute,
          private router: Router,
          private tipoCombustivelService: TipoCombustivelService
      ) { }

      ngOnInit(): void {
          this.route.paramMap
          .pipe(
                map((params) => params.get('id')),
                filter((id) => id != null),
                switchMap((id) => this.tipoCombustivelService.get(id))
          )
          .subscribe((value) => (this.tipoCombustivel = value));
      }

      handleSubmit(value: TipoCombustivel) {
        Object.assign(this.tipoCombustivel, value);

          if(this.tipoCombustivel.ativo) {
              this.tipoCombustivel.ativo = 1;
          } else {
              this.tipoCombustivel.ativo = 0;
          }
        

        this.tipoCombustivelService.update(this.tipoCombustivel).subscribe(
            (response) => {
                this.router.navigate(['/tipo-combustivel']);
                this.notificacao.success('Dados atualizados com sucesso!');
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



