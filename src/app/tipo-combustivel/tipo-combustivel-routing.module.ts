import { EditarTipoCombustivelComponent } from './editar/editar-tipo-combustivel.component';
import { CadastrarTipoCombustivelComponent } from './cadastrar/cadastrar-tipo-combustivel.component';
import { VisualizarTipoCombustivelComponent } from './visualizar/visualizar-tipo-combustivel.component';
import { RouterModule, Routes } from '@angular/router';
import { TipoCombustivelComponent } from './tipo-combustivel.component';
import { NgModule } from '@angular/core';



const routes: Routes = [
    
  { path: '', component: TipoCombustivelComponent },
  { path: 'cadastrar', component: CadastrarTipoCombustivelComponent },
  { path: 'editar/:id', component: EditarTipoCombustivelComponent },
  { path: 'visualizar/:id', component: VisualizarTipoCombustivelComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoCombustivelRoutingModule { }
