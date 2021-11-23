import { EditarTipoVeiculoComponent } from './editar/editar-tipo-veiculo.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { FiltrarTipoVeiculoDialogComponent } from './dialog/filtrar-dialog/filtrar-tipo-veiculo-dialog.component';
import { TipoVeiculoRoutingModule } from './tipo-veiculo-routing.module';
import { VisualizarTipoVeiculoComponent } from './visualizar/visualizar-tipo-veiculo.component';
import { TipoVeiculoComponent } from './tipo-veiculo.component';
import { CadastrarTipoVeiculoComponent } from './cadastrar/cadastrar-tipo-veiculo.component';
import { TipoVeiculoFormComponent } from './form/tipo-veiculo-form.component';



@NgModule({
    declarations: [
        VisualizarTipoVeiculoComponent,
        TipoVeiculoComponent,
        FiltrarTipoVeiculoDialogComponent,
        CadastrarTipoVeiculoComponent,
        TipoVeiculoFormComponent,
        EditarTipoVeiculoComponent,
    ],
    imports: [SharedModule, TipoVeiculoRoutingModule],
})
export class TipoVeiculoModule {}
