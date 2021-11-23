import { NotificacaoService } from './../../core/service/notificacao.service';
import { filter, switchMap, map } from 'rxjs/operators';
import { ItemVistoriaService } from './../item-vistoria.services';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemVistoria } from './../models/item-vistoria.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-item-vistoria',
  templateUrl: './editar-item-vistoria.component.html',
  styleUrls: ['./editar-item-vistoria.component.scss']
})
export class EditarItemVistoriaComponent implements OnInit {

  itemVistoria: ItemVistoria = null; 
  isHidden: boolean = true;

  constructor(
      private notificacao: NotificacaoService,
      private route: ActivatedRoute,
      private router: Router,
      private itemVistoriaService: ItemVistoriaService
  ) { }

  ngOnInit(): void {
      this.route.paramMap
      .pipe(
            map((params) => params.get('id')),
            filter((id) => id != null),
            switchMap((id) => this.itemVistoriaService.get(id))
      )
      .subscribe((value) => (this.itemVistoria = value));
  }

  handleSubmit(value: ItemVistoria) {
    Object.assign(this.itemVistoria, value);

      if(this.itemVistoria.ativo) {
          this.itemVistoria.ativo = 1;
      } else {
          this.itemVistoria.ativo = 0;
      }
    

    this.itemVistoriaService.update(this.itemVistoria).subscribe(
        (response) => {
            this.router.navigate(['/item-vistoria']);
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
