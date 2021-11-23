import { MotivoTransferenciaViaturaService } from './../motivo-transferencia-viatura.services';
import { MotivoTransferenciaViatura } from './../models/motivo-transferencia-viatura.model';
import { map, filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from '../../core/service/notificacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-transferencia-viatura',
  templateUrl: './editar-motivo-transferencia-viatura.component.html',
  styleUrls: ['./editar-motivo-transferencia-viatura.component.scss']
})
export class EditarMotivoTransferenciaViaturaComponent implements OnInit {

    motivoTransferenciaViatura: MotivoTransferenciaViatura = null; 
    isHidden: boolean = true;

    constructor(
        private notificacao: NotificacaoService,
        private route: ActivatedRoute,
        private router: Router,
        private motivoTransferenciaViaturaService: MotivoTransferenciaViaturaService
    ) { }

    ngOnInit(): void {
        this.route.paramMap
        .pipe(
              map((params) => params.get('id')),
              filter((id) => id != null),
              switchMap((id) => this.motivoTransferenciaViaturaService.get(id))
        )
        .subscribe((value) => (this.motivoTransferenciaViatura = value));
    }

    handleSubmit(value: MotivoTransferenciaViatura) {
      Object.assign(this.motivoTransferenciaViatura, value);

        if(this.motivoTransferenciaViatura.ativo) {
            this.motivoTransferenciaViatura.ativo = 1;
        } else {
            this.motivoTransferenciaViatura.ativo = 0;
        }
       

      this.motivoTransferenciaViaturaService.update(this.motivoTransferenciaViatura).subscribe(
          (response) => {
              this.router.navigate(['/motivo-transferencia-viatura']);
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


