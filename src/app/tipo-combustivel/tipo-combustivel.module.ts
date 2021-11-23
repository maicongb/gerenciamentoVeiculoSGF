import { EditarTipoCombustivelComponent } from './editar/editar-tipo-combustivel.component';
import { TipoCombustivelFormComponent } from './form/tipo-combustivel-form.component';
import { TipoCombustivelRoutingModule } from './tipo-combustivel-routing.module';
import { VisualizarTipoCombustivelComponent } from './visualizar/visualizar-tipo-combustivel.component';
import { SharedModule } from './../shared/shared.module';
import { TipoCombustivelComponent } from './tipo-combustivel.component';
import { NgModule } from '@angular/core';
import { FiltrarTipoCombustivelDialogComponent } from './dialog/filtrar-dialog/filtrar-tipo-combustivel-dialog.component';
import { CadastrarTipoCombustivelComponent } from './cadastrar/cadastrar-tipo-combustivel.component';



@NgModule({
  declarations: [
      TipoCombustivelComponent,
      FiltrarTipoCombustivelDialogComponent,
      VisualizarTipoCombustivelComponent,
      CadastrarTipoCombustivelComponent,
      TipoCombustivelFormComponent,
      EditarTipoCombustivelComponent

  ],
  imports: [SharedModule, TipoCombustivelRoutingModule],
})

export class TipoCombustivelModule { }
