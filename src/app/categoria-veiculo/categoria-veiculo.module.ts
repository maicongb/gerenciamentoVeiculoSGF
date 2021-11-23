import { EditarCategoriaVeiculoComponent } from './editar/editar-categoria-veiculo.component';
import { CategoriaVeiculoFormComponent } from './form/categoria-veiculo-form.component';
import { CadastrarCategoriaVeiculoComponent } from './cadastrar/cadastrar-categoria-veiculo.component';
import { VisualizarCategoriaVeiculoComponent } from './visualizar/visualizar-categoria-veiculo.component';
import { CategoriaVeiculoRoutingModule } from './categoria-veiculo-routing.module';
import { SharedModule } from './../shared/shared.module';
import { CategoriaVeiculoComponent } from './categoria-veiculo.component';
import { NgModule } from '@angular/core';
import { FiltrarCategoriaVeiculoDialogComponent } from './dialog/filtrar-categoria-veiculo-dialog/filtrar-categoria-veiculo-dialog.component';


@NgModule({
  declarations: [
      CategoriaVeiculoComponent,
      FiltrarCategoriaVeiculoDialogComponent,
      VisualizarCategoriaVeiculoComponent,
      CadastrarCategoriaVeiculoComponent,
      CategoriaVeiculoFormComponent,
      EditarCategoriaVeiculoComponent
  ],
  imports: [SharedModule, CategoriaVeiculoRoutingModule],
})
export class CategoriaVeiculoModule { }
