import { VisualizarModeloComponent } from './visualizar/visualizar-modelo/visualizar-modelo.component';
import { EditarModeloComponent } from './editar/editar-modelo.component';
import { CadastrarModeloComponent } from './cadastrar/cadastrar-modelo.component';
import { ModeloComponent } from './modelo.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  
    { path: '', component: ModeloComponent },
    { path: 'cadastrar', component: CadastrarModeloComponent },
    { path: 'editar/:id', component: EditarModeloComponent },
    { path: 'visualizar/:id', component: VisualizarModeloComponent },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], 
})

export class ModeloRoutingModule { }
