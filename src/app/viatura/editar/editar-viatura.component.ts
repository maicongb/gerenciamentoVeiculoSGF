import { Viatura } from './../models/viatura.model';
import { map, filter, switchMap } from 'rxjs/operators';
import { ViaturaService } from './../viatura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from './../../core/service/notificacao.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-editar-viatura',
  templateUrl: './editar-viatura.component.html',
  styleUrls: ['./editar-viatura.component.scss']
})
export class EditarViaturaComponent implements OnInit {

  viatura: Viatura = null; 
  //isHidden: boolean = true;

  constructor(
      private notificacao: NotificacaoService,
      private route: ActivatedRoute,
      private router: Router,
      private viaturaService: ViaturaService
  ) { }

  ngOnInit(): void {
      this.route.paramMap
      .pipe(
            map((params) => params.get('id')),
            filter((id) => id != null),
            switchMap((id) => this.viaturaService.get(id))
      )
      .subscribe((value) => (this.viatura = value));
  }

  handleSubmit(value: Viatura) {
    Object.assign(this.viatura, value);

      // if(this.tipoVeiculo.ativo) {
      //     this.tipoVeiculo.ativo = 1;
      // } else {
      //     this.tipoVeiculo.ativo = 0;
      // }
     

    //Excluir dados do objeto para edição
    this.excluirDadosDoObjeto(this.viatura);

    this.viaturaService.update(this.viatura).subscribe(
        (response) => {
            this.router.navigate(['/viatura']);
            this.notificacao.success('Dados atualizados com sucesso!');
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

  excluirDadosDoObjeto(viatura: Viatura){
    delete this.viatura['placaVinculada'];
    delete this.viatura['statusViatura'];
    delete this.viatura['motivoExclusao'];
    delete this.viatura['dtExclusao'];
    delete this.viatura['observacaoExclusao'];
    delete this.viatura['ativo'];
  }
}
