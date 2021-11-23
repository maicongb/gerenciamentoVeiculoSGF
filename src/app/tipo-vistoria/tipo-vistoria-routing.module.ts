import { EditarVistoriaViaturaComponent } from './editar/editar-vistoria-viatura.component';
import { CadastrarTipoVistoriaComponent } from './cadastrar/cadastrar-tipo-vistoria.component';
import { VisualizarTipoVistoriaComponent } from './visualizar/visualizar-tipo-vistoria.component';
import { TipoVistoriaComponent } from './tipo-vistoria.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes : Routes = [
    { path: '', component: TipoVistoriaComponent },
    { path: 'visualizar/:id', component: VisualizarTipoVistoriaComponent }, 
    { path: 'cadastrar', component: CadastrarTipoVistoriaComponent },
    { path: 'editar/:id', component: EditarVistoriaViaturaComponent }
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], 
})
export class TipoVistoriaRoutingModule { }
