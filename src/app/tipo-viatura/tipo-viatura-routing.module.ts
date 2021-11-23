import { EditarTipoViaturaComponent } from './editar/editar-tipo-viatura.component';
import { CadastrarTipoViaturaComponent } from './cadastrar/cadastrar-tipo-viatura.component';
import { VisualizarTipoViaturaComponent } from './visualizar/visualizar-tipo-viatura.component';
import { TipoViaturaComponent } from './tipo-viatura.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes : Routes = [

      { path: '', component : TipoViaturaComponent },
      { path: 'visualizar/:id', component: VisualizarTipoViaturaComponent },
      { path: 'cadastrar', component: CadastrarTipoViaturaComponent },
      { path: 'editar/:id', component: EditarTipoViaturaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule],
})

export class TipoViaturaRoutingModule { }
