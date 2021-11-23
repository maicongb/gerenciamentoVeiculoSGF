import { MotivoExclusaoViaturaService } from '../motivo-exclusao-viatura.services';
import { MotivoExclusaoViatura } from '../models/motivo-exclusao-viatura.model';
import { map, filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from '../../core/service/notificacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-exclusao-baixa-viatura',
  templateUrl: './editar-motivo-exclusao-viatura.component.html',
  styleUrls: ['./editar-motivo-exclusao-viatura.component.scss']
})
export class EditarMotivoExclusaoViaturaComponent implements OnInit {

    motivoExclusaoViatura: MotivoExclusaoViatura = null; 
    isHidden: boolean = true;

    constructor(
        private notificacao: NotificacaoService,
        private route: ActivatedRoute,
        private router: Router,
        private motivoExclusaoViaturaService: MotivoExclusaoViaturaService
    ) { }

    ngOnInit(): void {
        this.route.paramMap
        .pipe(
              map((params) => params.get('id')),
              filter((id) => id != null),
              switchMap((id) => this.motivoExclusaoViaturaService.get(id))
        )
        .subscribe((value) => (this.motivoExclusaoViatura = value));
    }

    handleSubmit(value: MotivoExclusaoViatura) {
      Object.assign(this.motivoExclusaoViatura, value);

        if(this.motivoExclusaoViatura.ativo) {
            this.motivoExclusaoViatura.ativo = 1;
        } else {
            this.motivoExclusaoViatura.ativo = 0;
        }
       

      this.motivoExclusaoViaturaService.update(this.motivoExclusaoViatura).subscribe(
          (response) => {
              this.router.navigate(['/motivo-exclusao-viatura']);
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


