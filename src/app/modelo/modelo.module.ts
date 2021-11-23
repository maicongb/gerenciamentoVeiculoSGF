import { VisualizarModeloComponent } from './visualizar/visualizar-modelo/visualizar-modelo.component';
import { EditarModeloComponent } from './editar/editar-modelo.component';
import { ModeloFormComponent } from './form/modelo-form.component';
import { CadastrarModeloComponent } from './cadastrar/cadastrar-modelo.component';
import { FiltrarModeloDialogComponent } from './dialog/filtrar-dialog/filtrar-modelo-dialog.component';
import { SharedModule } from './../shared/shared.module';
import { ModeloRoutingModule } from './modelo-routing.module';
import { ModeloComponent } from './modelo.component';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    ModeloComponent,
    FiltrarModeloDialogComponent,
    CadastrarModeloComponent,
    ModeloFormComponent,
    EditarModeloComponent,
    VisualizarModeloComponent
  ],
  imports: [
    SharedModule, ModeloRoutingModule
  ]
})
export class ModeloModule { }
