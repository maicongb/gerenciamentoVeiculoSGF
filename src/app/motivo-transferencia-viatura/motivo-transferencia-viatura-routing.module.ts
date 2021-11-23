import { EditarMotivoTransferenciaViaturaComponent } from './editar/editar-motivo-transferencia-viatura.component';
import { CadastrarTransferenciaViaturaComponent } from './cadastrar/cadastrar-transferencia-viatura.component';
import { VisualizarMotivoTransferenciaViaturaComponent } from './visualizar/visualizar-motivo-transferencia-viatura.component';
import { RouterModule, Routes } from '@angular/router';
import { MotivoTransferenciaViaturaComponent } from './motivo-transferencia-viatura.component';
import { NgModule } from '@angular/core';

const routes : Routes = [

  { path: '', component : MotivoTransferenciaViaturaComponent },
  { path: 'visualizar/:id', component: VisualizarMotivoTransferenciaViaturaComponent },
  { path: 'cadastrar', component: CadastrarTransferenciaViaturaComponent },
  { path: 'editar/:id', component: EditarMotivoTransferenciaViaturaComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule],
})

export class MotivoTransferenciaViaturaRoutingModule { }
