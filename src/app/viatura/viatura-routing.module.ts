import { EditarViaturaComponent } from './editar/editar-viatura.component';
import { CadastrarViaturaComponent } from './cadastrar/cadastrar-viatura.component';
import { RouterModule, Routes } from '@angular/router';
import { ViaturaComponent } from './viatura.component';
import { NgModule } from '@angular/core';


const routes : Routes = [
  { path: '', component: ViaturaComponent },
  // { path: 'visualizar/:id', component: VisualizarTipoVistoriaComponent }, 
  { path: 'cadastrar', component: CadastrarViaturaComponent },
  { path: 'editar/:id', component: EditarViaturaComponent }
];



@NgModule({
declarations: [],
imports: [RouterModule.forChild(routes)],
exports: [RouterModule], 
})

export class ViaturaRoutingModule { }
