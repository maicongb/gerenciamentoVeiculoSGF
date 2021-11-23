import { EditarCategoriaVeiculoComponent } from './editar/editar-categoria-veiculo.component';
import { CadastrarCategoriaVeiculoComponent } from './cadastrar/cadastrar-categoria-veiculo.component';
import { VisualizarCategoriaVeiculoComponent } from './visualizar/visualizar-categoria-veiculo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaVeiculoComponent } from './categoria-veiculo.component';


const routes: Routes = [

    { path: '', component: CategoriaVeiculoComponent },
    { path: 'visualizar/:id', component: VisualizarCategoriaVeiculoComponent },
    { path: 'cadastrar', component: CadastrarCategoriaVeiculoComponent },
    { path: 'editar/:id', component: EditarCategoriaVeiculoComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CategoriaVeiculoRoutingModule {}