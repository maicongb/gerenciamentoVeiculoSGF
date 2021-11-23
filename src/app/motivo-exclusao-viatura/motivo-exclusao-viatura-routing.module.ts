import { VisualizarMotivoExclusaoViaturaComponent } from './visualizar/visualizar-motivo-exclusao-viatura.component';
import { EditarMotivoExclusaoViaturaComponent } from './editar/editar-motivo-exclusao-viatura.component';
import { CadastrarMotivoExclusaoViaturaComponent } from './cadastrar/cadastrar-motivo-exclusao-viatura.component';
import { MotivoExclusaoViaturaComponent } from './motivo-exclusao-viatura.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes : Routes = [

      { path: '', component : MotivoExclusaoViaturaComponent },
      { path: 'visualizar/:id', component: VisualizarMotivoExclusaoViaturaComponent },
      { path: 'cadastrar', component: CadastrarMotivoExclusaoViaturaComponent },
      { path: 'editar/:id', component: EditarMotivoExclusaoViaturaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule],
})

export class MotivoExclusaoViaturaRoutingModule { }
