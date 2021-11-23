import { EditarMarcaComponent } from './editar/editar-marca.component';
import { CadastrarMarcaComponent } from './cadastrar/cadastrar-marca.component';
import { VisualizarMarcaComponent } from './visualizar/visualizar-marca.component';
import { RouterModule, Routes } from '@angular/router';
import { MarcaComponent } from './marca.component';
import { NgModule } from '@angular/core';

const routes : Routes = [

  { path: '', component: MarcaComponent },
  { path: 'visualizar/:id', component: VisualizarMarcaComponent },
  { path: 'cadastrar', component: CadastrarMarcaComponent },
  { path: 'editar/:id', component: EditarMarcaComponent },


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], 
})

export class MarcaRoutingModule { }
