import { EditarMotivoTransferenciaViaturaComponent } from './editar/editar-motivo-transferencia-viatura.component';
import { MotivoTransferenciaViaturaFormComponent } from './form/motivo-transferencia-viatura-form.component';
import { CadastrarTransferenciaViaturaComponent } from './cadastrar/cadastrar-transferencia-viatura.component';
import { VisualizarMotivoTransferenciaViaturaComponent } from './visualizar/visualizar-motivo-transferencia-viatura.component';
import { FiltrarMotivoTransferenciaViaturaDialogComponent } from './dialog/filtrar-dialog/filtrar-motivo-transferencia-viatura-dialog.component';
import { MotivoTransferenciaViaturaRoutingModule } from './motivo-transferencia-viatura-routing.module';
import { SharedModule } from './../shared/shared.module';
import { MotivoTransferenciaViaturaComponent } from './motivo-transferencia-viatura.component';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [

    MotivoTransferenciaViaturaComponent,
    FiltrarMotivoTransferenciaViaturaDialogComponent,
    VisualizarMotivoTransferenciaViaturaComponent,
    MotivoTransferenciaViaturaFormComponent,
    CadastrarTransferenciaViaturaComponent,
    EditarMotivoTransferenciaViaturaComponent

  ],
  imports: [
    SharedModule, MotivoTransferenciaViaturaRoutingModule
  ]
})
export class MotivoTransferenciaViaturaModule { }
