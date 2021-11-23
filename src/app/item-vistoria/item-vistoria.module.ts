import { EditarItemVistoriaComponent } from './editar/editar-item-vistoria.component';
import { ItemVistoriaFormComponent } from './form/item-vistoria-form.component';
import { CadastrarItemVistoriaComponent } from './cadastrar/cadastrar-item-vistoria.component';
import { VisualizarItemVistoriaComponent } from './visualizar/visualizar-item-vistoria.component';
import { FiltrarItemVistoriaDialogComponent } from './dialog/filtrar-dialog/filtrar-item-vistoria-dialog.component';
import { ItemVistoriaRoutingModule } from './item-vistoria-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ItemVistoriaComponent } from './item-vistoria.component';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
      ItemVistoriaComponent,
      FiltrarItemVistoriaDialogComponent,
      VisualizarItemVistoriaComponent,
      CadastrarItemVistoriaComponent,
      ItemVistoriaFormComponent,
      EditarItemVistoriaComponent
  ],
  imports: [
    SharedModule, ItemVistoriaRoutingModule
  ]
})
export class ItemVistoriaModule { }
