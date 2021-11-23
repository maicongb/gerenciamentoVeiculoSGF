import { TipoViaturaRoutingModule } from './tipo-viatura-routing.module';
import { EditarTipoViaturaComponent } from './editar/editar-tipo-viatura.component';
import { TipoViaturaFormComponent } from './form/tipo-viatura-form.component';
import { CadastrarTipoViaturaComponent } from './cadastrar/cadastrar-tipo-viatura.component';
import { VisualizarTipoViaturaComponent } from './visualizar/visualizar-tipo-viatura.component';
import { FiltrarTipoViaturaDialogComponent } from './dialog/filtrar-dialog/filtrar-tipo-viatura-dialog.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TipoViaturaComponent } from './tipo-viatura.component';


@NgModule({
    declarations: [
        TipoViaturaComponent,
        FiltrarTipoViaturaDialogComponent,
        CadastrarTipoViaturaComponent,
        TipoViaturaFormComponent,
        EditarTipoViaturaComponent,
        VisualizarTipoViaturaComponent
    ],
    imports: [SharedModule, TipoViaturaRoutingModule],
})
export class TipoViaturaModule {}
