import { map, filter, switchMap } from 'rxjs/operators';
import { TipoVistoriaService } from './../tipo-vistoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from './../../core/service/notificacao.service';
import { TipoVistoria } from './../models/tipo-vistoria.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-vistoria-viatura',
  templateUrl: './editar-vistoria-viatura.component.html',
  styleUrls: ['./editar-vistoria-viatura.component.scss']
})
export class EditarVistoriaViaturaComponent implements OnInit {

  tipoVistoria: TipoVistoria = null; 
  isHidden: boolean = true;

  constructor(
      private notificacao: NotificacaoService,
      private route: ActivatedRoute,
      private router: Router,
      private tipoVistoriaService: TipoVistoriaService
  ) { }

  ngOnInit(): void {
      this.route.paramMap
      .pipe(
            map((params) => params.get('id')),
            filter((id) => id != null),
            switchMap((id) => this.tipoVistoriaService.get(id))
      )
      .subscribe((value) => (this.tipoVistoria = value));
  }

  handleSubmit(value: TipoVistoria) {
    Object.assign(this.tipoVistoria, value);

      if(this.tipoVistoria.ativo) {
          this.tipoVistoria.ativo = 1;
      } else {
          this.tipoVistoria.ativo = 0;
      }
     

    this.tipoVistoriaService.update(this.tipoVistoria).subscribe(
        (response) => {
            this.router.navigate(['/tipo-vistoria']);
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


