import { EditarVistoriaViaturaComponent } from './editar/editar-vistoria-viatura.component';
import { TipoVistoriaFormComponent } from './form/tipo-vistoria-form.component';
import { CadastrarTipoVistoriaComponent } from './cadastrar/cadastrar-tipo-vistoria.component';
import { VisualizarTipoVistoriaComponent } from './visualizar/visualizar-tipo-vistoria.component';
import { FiltrarTipoVistoriaDialogComponent } from './dialog/filtrar-dialog/filtrar-tipo-vistoria-dialog.component';
import { TipoVistoriaRoutingModule } from './tipo-vistoria-routing.module';
import { SharedModule } from './../shared/shared.module';
import { TipoVistoriaComponent } from './tipo-vistoria.component';
import { NgModule } from '@angular/core';





@NgModule({
  declarations: [
      TipoVistoriaComponent,
      FiltrarTipoVistoriaDialogComponent,
      VisualizarTipoVistoriaComponent,
      CadastrarTipoVistoriaComponent,
      TipoVistoriaFormComponent,
      EditarVistoriaViaturaComponent
  ],
  imports: [
    SharedModule, TipoVistoriaRoutingModule],
})
export class TipoVistoriaModule { }
