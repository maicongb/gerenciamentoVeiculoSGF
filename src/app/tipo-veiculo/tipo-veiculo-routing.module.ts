import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizarTipoVeiculoComponent } from './visualizar/visualizar-tipo-veiculo.component';
import { EditarTipoVeiculoComponent } from './editar/editar-tipo-veiculo.component';
import { CadastrarTipoVeiculoComponent } from './cadastrar/cadastrar-tipo-veiculo.component';
import { TipoVeiculoComponent } from './tipo-veiculo.component';


const routes: Routes = [
    
    { path: '', component: TipoVeiculoComponent },
    { path: 'cadastrar', component: CadastrarTipoVeiculoComponent },
    { path: 'editar/:id', component: EditarTipoVeiculoComponent },
    { path: 'visualizar/:id', component: VisualizarTipoVeiculoComponent },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class TipoVeiculoRoutingModule {}

