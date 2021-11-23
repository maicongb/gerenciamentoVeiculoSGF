import { FiltrarMotivoBaixaViaturaDialogComponent } from './dialog/filtrar-dialog/filtrar-motivo-baixa-viatura-dialog.component';
import { VisualizarMotivoBaixaViaturaComponent } from './visualizar/visualizar-motivo-baixa-viatura.component';
import { EditarMotivoBaixaViaturaComponent } from './editar/editar-motivo-baixa-viatura.component';
import { MotivoBaixaViaturaFormComponent } from './form/motivo-baixa-viatura-form.component';
import { CadastrarMotivoBaixaViaturaComponent } from './cadastrar/cadastrar-motivo-baixa-viatura.component';
import { MotivoBaixaViaturaRoutingModule } from './motivo-baixa-viatura-routing.module';
import { MotivoBaixaViaturaComponent } from './motivo-baixa-viatura.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';



@NgModule({
    declarations: [
        MotivoBaixaViaturaComponent,
        FiltrarMotivoBaixaViaturaDialogComponent,
        CadastrarMotivoBaixaViaturaComponent,
        MotivoBaixaViaturaFormComponent,
        EditarMotivoBaixaViaturaComponent,
        VisualizarMotivoBaixaViaturaComponent
    ],
    imports: [SharedModule, MotivoBaixaViaturaRoutingModule],
})
export class MotivoBaixaViaturaModule {}
