import { map, filter, switchMap } from 'rxjs/operators';
import { ModeloService } from './../modelo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from 'src/app/core/service/notificacao.service';
import { ModeloVeiculo } from './../models/modelo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-modelo',
  templateUrl: './editar-modelo.component.html',
  styleUrls: ['./editar-modelo.component.scss']
})
export class EditarModeloComponent implements OnInit {

      modeloVeiculo: ModeloVeiculo = null; 
      isHidden: boolean = true;

      constructor(
          private notificacao: NotificacaoService,
          private route: ActivatedRoute,
          private router: Router,
          private modeloService: ModeloService
      ) { }

      ngOnInit(): void {
          this.route.paramMap
          .pipe(
                map((params) => params.get('id')),
                filter((id) => id != null),
                switchMap((id) => this.modeloService.get(id))
          )
          .subscribe((value) => (this.modeloVeiculo = value));
      }

      handleSubmit(value: ModeloVeiculo) {
        Object.assign(this.modeloVeiculo, value);

          if(this.modeloVeiculo.ativo) {
              this.modeloVeiculo.ativo = 1;
          } else {
              this.modeloVeiculo.ativo = 0;
          }
        

        this.modeloService.update(this.modeloVeiculo).subscribe(
            (response) => {
                this.router.navigate(['/modelo-veiculo']);
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
