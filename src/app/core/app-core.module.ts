import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { NotificacaoService } from './service/notificacao.service';
import { ApiService } from './service/api.service';


@NgModule({
    declarations: [],
    imports: [ToastrModule],
})
export class AppCoreModule {
    static forRoot(): ModuleWithProviders<AppCoreModule> {
        return {
            ngModule: AppCoreModule,
            providers: [
                NotificacaoService,
                ApiService,
                ...ToastrModule.forRoot().providers,
            ],
        };
    }
}
