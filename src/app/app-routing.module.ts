import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'categoria-veiculo',
        loadChildren: () =>
            import('./categoria-veiculo/categoria-veiculo.module').then(
                (m) => m.CategoriaVeiculoModule
            ),
    },

    {
        path: 'item-vistoria',
        loadChildren: () =>
            import('./item-vistoria/item-vistoria.module').then(
                (m) => m.ItemVistoriaModule
            ),
    },


    {  
        path: 'tipo-combustivel',
        loadChildren: () =>
            import('./tipo-combustivel/tipo-combustivel.module').then(
                (m) => m.TipoCombustivelModule
            ),
    },

    {  
        path: 'marca-veiculo',
        loadChildren: () =>
            import('./marca/marca.module').then(
                (m) => m.MarcaModule
            ),
    },

    {  
        path: 'modelo-veiculo',
        loadChildren: () =>
            import('./modelo/modelo.module').then(
                (m) => m.ModeloModule
            ),
    },

    {  
        path: 'tipo-veiculo',
        loadChildren: () =>
            import('./tipo-veiculo/tipo-veiculo.module').then(
                (m) => m.TipoVeiculoModule
            ),
    },

    {  
        path: 'tipo-viatura',
        loadChildren: () =>
            import('./tipo-viatura/tipo-viatura.module').then(
                (m) => m.TipoViaturaModule
            ),
    },

    {

        path: 'tipo-vistoria',
        loadChildren: () =>
            import('./tipo-vistoria/tipo-vistoria.module').then(
                (m) => m.TipoVistoriaModule
            ),

    },    

    {  
        path: 'motivo-baixa-viatura',
        loadChildren: () =>
            import('./motivo-baixa-viatura/motivo-baixa-viatura.module').then(
                (m) => m.MotivoBaixaViaturaModule
            ),
    },

    {  
        path: 'motivo-exclusao-viatura',
        loadChildren: () =>
            import('./motivo-exclusao-viatura/motivo-exclusao-viatura.module').then(
                (m) => m.MotivoExclusaoViaturaModule
            ),
    },

    {  
        path: 'motivo-transferencia-viatura',
        loadChildren: () =>
            import('./motivo-transferencia-viatura/motivo-transferencia-viatura.module').then(
                (m) => m.MotivoTransferenciaViaturaModule
            ),
    },

    {  
        path: 'viatura',
        loadChildren: () =>
            import('./viatura/viatura.module').then(
                (m) => m.ViaturaModule
            ),
    },

    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
