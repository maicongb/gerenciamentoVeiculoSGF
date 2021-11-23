import { Component } from '@angular/core';
import { MenuDefinition } from './shared/components/menu/menu-definition';
import { Observable } from 'rxjs';
import { Usuario } from './core/models/usuario.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'SGF';
    user$: Observable<Usuario>;

    menuItens: MenuDefinition[] = [
        { label: 'Dashboard', icon: 'dashboard', route: '/' },
    
        {
            label: 'Categoria de Veículo',
            icon: 'two_wheeler',
            subitens: [
                {
                    label: 'Pesquisar',
                    icon: 'search',
                    route: '/categoria-veiculo',
                },
                {
                    label: 'Cadastrar',
                    icon: 'note_add',
                    route: '/categoria-veiculo/cadastrar',
                },
            ],
        },

        {
            label: 'Item de Vistoria',
            icon: 'support',
            subitens: [
                {
                    label: 'Pesquisar',
                    icon: 'search',
                    route: '/item-vistoria',
                },
                {
                    label: 'Cadastrar',
                    icon: 'note_add',
                    route: '/item-vistoria/cadastrar',
                },
            ],
        },

        {
            label: 'Marca do Veículo',
            icon: 'security',
            subitens: [
                {
                    label: 'Pesquisar',
                    icon: 'search',
                    route: '/marca-veiculo',
                },
                {
                    label: 'Cadastrar',
                    icon: 'note_add',
                    route: '/marca-veiculo/cadastrar',
                },
            ],
        },

        {
            label: 'Modelo do Veículo',
            icon: 'style',
            subitens: [
                {
                    label: 'Pesquisar',
                    icon: 'search',
                    route: '/modelo-veiculo',
                },
                {
                    label: 'Cadastrar',
                    icon: 'note_add',
                    route: '/modelo-veiculo/cadastrar',
                },
            ],
        },

        {
            label: 'Motivo de Baixa',
            icon: 'build_circle',
            subitens: [
                {
                    label: 'Pesquisar',
                    icon: 'search',
                    route: '/motivo-baixa-viatura',
                },
                {
                    label: 'Cadastrar',
                    icon: 'note_add',
                    route: '/motivo-baixa-viatura/cadastrar',
                },
            ],
        },

        {
            label: 'Motivo de Exclusão',
            icon: 'delete',
            subitens: [
                {
                    label: 'Pesquisar',
                    icon: 'search',
                    route: '/motivo-exclusao-viatura',
                },
                {
                    label: 'Cadastrar',
                    icon: 'note_add',
                    route: '/motivo-exclusao-viatura/cadastrar',
                },
            ],
        },

        {
            label: 'Motivo de Transferência',
            icon: 'compare_arrows',
            subitens: [
                {
                    label: 'Pesquisar',
                    icon: 'search',
                    route: '/motivo-transferencia-viatura',
                },
                {
                    label: 'Cadastrar',
                    icon: 'note_add',
                    route: '/motivo-transferencia-viatura/cadastrar',
                },
            ],
        },

        {
            label: 'Tipo de Combustível',
            icon: 'local_gas_station',
            subitens: [
                {
                    label: 'Pesquisar',
                    icon: 'search',
                    route: '/tipo-combustivel',
                },
                {
                    label: 'Cadastrar',
                    icon: 'note_add',
                    route: '/tipo-combustivel/cadastrar',
                },
            ],
        },

        {
            label: 'Tipo de Viatura',
            icon: 'local_shipping',
            subitens: [
                {
                    label: 'Pesquisar',
                    icon: 'search',
                    route: '/tipo-viatura',
                },
                {
                    label: 'Cadastrar',
                    icon: 'note_add',
                    route: '/tipo-viatura/cadastrar',
                },
            ],
        },

        {
            label: 'Tipo de Veículo',
            icon: 'directions_bus',
            subitens: [
                {
                    label: 'Pesquisar',
                    icon: 'search',
                    route: '/tipo-veiculo',
                },
                {
                    label: 'Cadastrar',
                    icon: 'note_add',
                    route: '/tipo-veiculo/cadastrar',
                },
            ],
        },

        {
            label: 'Tipo de Vistoria',
            icon: 'rule',
            subitens: [
                {
                    label: 'Pesquisar',
                    icon: 'search',
                    route: '/tipo-vistoria',
                },
                {
                    label: 'Cadastrar',
                    icon: 'note_add',
                    route: '/tipo-vistoria/cadastrar',
                },
            ],
        },

        {
            label: 'Viatura',
            icon: 'local_car_wash',
            subitens: [
                {
                    label: 'Pesquisar',
                    icon: 'search',
                    route: '/viatura',
                },
                {
                    label: 'Cadastrar',
                    icon: 'note_add',
                    route: '/viatura/cadastrar',
                },
            ],
        },
    ];

//    constructor(private authService: AuthService) {
//        this.authService.login();
//        this.user$ = this.authService.getUser();
//    }

//    handleLogout() {
//        this.authService.logout();
//    }
}
