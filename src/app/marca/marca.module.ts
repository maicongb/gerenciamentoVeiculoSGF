import { EditarMarcaComponent } from './editar/editar-marca.component';
import { CadastrarMarcaComponent } from './cadastrar/cadastrar-marca.component';
import { MarcaFormComponent } from './form/marca-form.component';
import { VisualizarMarcaComponent } from './visualizar/visualizar-marca.component';
import { FiltrarMarcaDialogComponent } from './dialog/filtrar-dialog/filtrar-marca-dialog.component';
import { SharedModule } from './../shared/shared.module';
import { MarcaRoutingModule } from './marca-routing.module';
import { MarcaComponent } from './marca.component';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    MarcaComponent,
    FiltrarMarcaDialogComponent,
    VisualizarMarcaComponent,
    CadastrarMarcaComponent,
    MarcaFormComponent,
    EditarMarcaComponent

  ],
  imports: [
    SharedModule, MarcaRoutingModule
  ]
})
export class MarcaModule { }
