import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class NotificacaoService {
    constructor(private toastr: ToastrService) {}

    success(msg: string): void {
        this.toastr.success(msg, 'Sucesso', {
            positionClass: 'toast-top-center',
        });
    }

    info(msg: string): void {
        this.toastr.info(msg, 'Informação', {
            positionClass: 'toast-top-center',
        });
    }

    warning(msg: string): void {
        this.toastr.warning(msg, 'Atenção', {
            positionClass: 'toast-top-center',
        });
    }

    error(msg: string): void {
        this.toastr.error(msg, 'Erro', {
            positionClass: 'toast-top-center',
        });
    }
}
