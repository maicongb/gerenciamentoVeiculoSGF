import { Observable } from 'rxjs';
import { TipoVistoriaService } from './../../tipo-vistoria/tipo-vistoria.service';
import { ItemVistoria } from './../models/item-vistoria.model';
import { NotificacaoService } from './../../core/service/notificacao.service';
import { EventEmitter, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { 
          Component, 
          OnChanges, 
          OnInit, 
          Input, 
          Output } from '@angular/core';
import { TipoVistoria } from 'src/app/tipo-vistoria/models/tipo-vistoria.model';

@Component({
  selector: 'app-item-vistoria-form',
  templateUrl: './item-vistoria-form.component.html',
  styleUrls: ['./item-vistoria-form.component.scss']
})
export class ItemVistoriaFormComponent implements OnInit, OnChanges {

    @Input()
    tiposVistorias$: Observable<TipoVistoria[]>;

    form = this.formBuilder.group({
        nome: ['', Validators.required],
        tipoVistoria: this.formBuilder.group({
            id: [null, Validators.required],
        }),
        ativo: [null],
    });

    @Input()
    isHidden: boolean

    @Input()
    value: ItemVistoria;

    @Input()
    saveLabel: string;

    @Output()
    appSubmit = new EventEmitter<ItemVistoria>();

    @ViewChild(FormGroupDirective)
    formGroupDirective: FormGroupDirective;

    constructor(
    private notificacao: NotificacaoService,
    private formBuilder: FormBuilder,
    private tipoVistoriaService: TipoVistoriaService,
    ) {}

    ngOnInit(): void {
        
        this.tiposVistorias$ = this.tipoVistoriaService
                                        .getTipoVistoria();

        if (this.value) {
            this.form.patchValue(this.value);
        }

    }

    ngOnChanges(changes: SimpleChanges): void {
        const value: SimpleChange = changes?.value;
        if (value && value.currentValue) {
            this.form.patchValue(value.currentValue);
        } else if (this.formGroupDirective) {
            this.form.reset();
            this.formGroupDirective.resetForm();
        }
    }

    handleSubmit() {
        if (this.form.valid) {
            this.appSubmit.emit(new ItemVistoria(this.form.value));
        } else {
            this.notificacao.error(
                'Não é possível salvar enquanto existirem erros.'
            );
        }
    }

}
