import { map, filter, switchMap } from 'rxjs/operators';
import { MarcaService } from './../marca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from './../../core/service/notificacao.service';
import { MarcaVeiculo } from './../models/marca.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-marca',
  templateUrl: './editar-marca.component.html',
  styleUrls: ['./editar-marca.component.scss']
})
export class EditarMarcaComponent implements OnInit {

    marcaVeiculo: MarcaVeiculo = null; 
    isHidden: boolean = true;

    constructor(
        private notificacao: NotificacaoService,
        private route: ActivatedRoute,
        private router: Router,
        private marcaService: MarcaService
    ) { }

    ngOnInit(): void {
        this.route.paramMap
        .pipe(
              map((params) => params.get('id')),
              filter((id) => id != null),
              switchMap((id) => this.marcaService.get(id))
        )
        .subscribe((value) => (this.marcaVeiculo = value));
    }

    handleSubmit(value: MarcaVeiculo) {
      Object.assign(this.marcaVeiculo, value);

        if(this.marcaVeiculo.ativo) {
            this.marcaVeiculo.ativo = 1;
        } else {
            this.marcaVeiculo.ativo = 0;
        }
      

      this.marcaService.update(this.marcaVeiculo).subscribe(
          (response) => {
              this.router.navigate(['/marca-veiculo']);
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
