import { MotivoBaixaViaturaService } from './../motivo-baixa-viatura.services';
import { MotivoBaixaViatura } from './../models/motivo-baixa-viatura.model';
import { map, filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from '../../core/service/notificacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-motivo-baixa-viatura',
  templateUrl: './editar-motivo-baixa-viatura.component.html',
  styleUrls: ['./editar-motivo-baixa-viatura.component.scss']
})
export class EditarMotivoBaixaViaturaComponent implements OnInit {

    motivoBaixaViatura: MotivoBaixaViatura = null; 
    isHidden: boolean = true;

    constructor(
        private notificacao: NotificacaoService,
        private route: ActivatedRoute,
        private router: Router,
        private motivoBaixaViaturaService: MotivoBaixaViaturaService
    ) { }

    ngOnInit(): void {
        this.route.paramMap
        .pipe(
              map((params) => params.get('id')),
              filter((id) => id != null),
              switchMap((id) => this.motivoBaixaViaturaService.get(id))
        )
        .subscribe((value) => (this.motivoBaixaViatura = value));
    }

    handleSubmit(value: MotivoBaixaViatura) {
      Object.assign(this.motivoBaixaViatura, value);

        if(this.motivoBaixaViatura.ativo) {
            this.motivoBaixaViatura.ativo = 1;
        } else {
            this.motivoBaixaViatura.ativo = 0;
        }
       

      this.motivoBaixaViaturaService.update(this.motivoBaixaViatura).subscribe(
          (response) => {
              this.router.navigate(['/motivo-baixa-viatura']);
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


