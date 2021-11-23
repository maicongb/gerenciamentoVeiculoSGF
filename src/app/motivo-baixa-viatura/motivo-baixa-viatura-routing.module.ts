import { VisualizarMotivoBaixaViaturaComponent } from './visualizar/visualizar-motivo-baixa-viatura.component';
import { EditarMotivoBaixaViaturaComponent } from './editar/editar-motivo-baixa-viatura.component';
import { CadastrarMotivoBaixaViaturaComponent } from './cadastrar/cadastrar-motivo-baixa-viatura.component';
import { MotivoBaixaViaturaComponent } from './motivo-baixa-viatura.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes : Routes = [

      { path: '', component : MotivoBaixaViaturaComponent },
      { path: 'visualizar/:id', component: VisualizarMotivoBaixaViaturaComponent },
      { path: 'cadastrar', component: CadastrarMotivoBaixaViaturaComponent },
      { path: 'editar/:id', component: EditarMotivoBaixaViaturaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MotivoBaixaViaturaRoutingModule { }
