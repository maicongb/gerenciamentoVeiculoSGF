import { EditarViaturaComponent } from './editar/editar-viatura.component';
import { ViaturaFormComponent } from './form/viatura-form.component';
import { CadastrarViaturaComponent } from './cadastrar/cadastrar-viatura.component';
import { ViaturaRoutingModule } from './viatura-routing.module';
import { FiltrarViaturaDialogComponent } from './dialog/filtrar-dialog/filtrar-viatura-dialog.component';
import { ViaturaComponent } from './viatura.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    ViaturaComponent,
    FiltrarViaturaDialogComponent,
    CadastrarViaturaComponent,
    ViaturaFormComponent,
    EditarViaturaComponent

  ],
  imports: [
    SharedModule, ViaturaRoutingModule
  ]
})
export class ViaturaModule { }
