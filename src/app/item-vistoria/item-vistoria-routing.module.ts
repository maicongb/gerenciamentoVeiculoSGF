import { EditarItemVistoriaComponent } from './editar/editar-item-vistoria.component';
import { CadastrarItemVistoriaComponent } from './cadastrar/cadastrar-item-vistoria.component';
import { VisualizarItemVistoriaComponent } from './visualizar/visualizar-item-vistoria.component';
import { ItemVistoriaComponent } from './item-vistoria.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes : Routes = [

  { path: '', component: ItemVistoriaComponent },
  { path: 'visualizar/:id', component: VisualizarItemVistoriaComponent },
  { path: 'cadastrar', component: CadastrarItemVistoriaComponent },
  { path: 'editar/:id', component: EditarItemVistoriaComponent },


];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})

export class ItemVistoriaRoutingModule { }
