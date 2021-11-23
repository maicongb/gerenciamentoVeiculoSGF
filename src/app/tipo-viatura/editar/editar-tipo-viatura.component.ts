import { TipoViaturaService } from './../tipo-viatura.service';
import { TipoViatura } from './../models/tipo-viatura.model';
import { map, filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from '../../core/service/notificacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-tipo-viatura',
  templateUrl: './editar-tipo-viatura.component.html',
  styleUrls: ['./editar-tipo-viatura.component.scss']
})
export class EditarTipoViaturaComponent implements OnInit {

    tipoViatura: TipoViatura = null; 
    isHidden: boolean = true;

    constructor(
        private notificacao: NotificacaoService,
        private route: ActivatedRoute,
        private router: Router,
        private tipoViaturaService: TipoViaturaService
    ) { }

    ngOnInit(): void {
        this.route.paramMap
        .pipe(
              map((params) => params.get('id')),
              filter((id) => id != null),
              switchMap((id) => this.tipoViaturaService.get(id))
        )
        .subscribe((value) => (this.tipoViatura = value));
    }

    handleSubmit(value: TipoViatura) {
      Object.assign(this.tipoViatura, value);

        if(this.tipoViatura.ativo) {
            this.tipoViatura.ativo = 1;
        } else {
            this.tipoViatura.ativo = 0;
        }
       

      this.tipoViaturaService.update(this.tipoViatura).subscribe(
          (response) => {
              this.router.navigate(['/tipo-viatura']);
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


