import { VisualizarMotivoExclusaoViaturaComponent } from './visualizar/visualizar-motivo-exclusao-viatura.component';
import { EditarMotivoExclusaoViaturaComponent } from './editar/editar-motivo-exclusao-viatura.component';
import { MotivoExclusaoViaturaFormComponent } from './form/motivo-exclusao-viatura-form.component';
import { CadastrarMotivoExclusaoViaturaComponent } from './cadastrar/cadastrar-motivo-exclusao-viatura.component';
import { FiltrarMotivoExclusaoViaturaDialogComponent } from './dialog/filtrar-dialog/filtrar-motivo-exclusao-viatura-dialog.component';
import { MotivoExclusaoViaturaRoutingModule } from './motivo-exclusao-viatura-routing.module';
import { MotivoExclusaoViaturaComponent } from './motivo-exclusao-viatura.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';



@NgModule({
    declarations: [
        MotivoExclusaoViaturaComponent,
        FiltrarMotivoExclusaoViaturaDialogComponent,
        CadastrarMotivoExclusaoViaturaComponent,
        MotivoExclusaoViaturaFormComponent,
        VisualizarMotivoExclusaoViaturaComponent,
        EditarMotivoExclusaoViaturaComponent
    ],
    imports: [SharedModule, MotivoExclusaoViaturaRoutingModule],
})
export class MotivoExclusaoViaturaModule {}
