import { MotivoBaixaViatura } from './../models/motivo-baixa-viatura.model';
import { NotificacaoService } from '../../core/service/notificacao.service';
import { EventEmitter, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { 
        Component, 
        OnChanges, 
        OnInit, 
        Input, 
        Output } from '@angular/core';


@Component({
  selector: 'app-motivo-baixa-viatura-form',
  templateUrl: './motivo-baixa-viatura-form.component.html',
  styleUrls: ['./motivo-baixa-viatura-form.component.scss']
})
export class MotivoBaixaViaturaFormComponent implements OnInit, OnChanges {

    form = this.formBuilder.group({
      nome: ['', Validators.required],
      ativo: [null],
    });

    @Input()
    isHidden: boolean

    @Input()
    value: MotivoBaixaViatura;

    @Input()
    saveLabel: string;

    @Output()
    appSubmit = new EventEmitter<MotivoBaixaViatura>();

    @ViewChild(FormGroupDirective)
    FormGroupDirective: FormGroupDirective;

    constructor(
      private notificacao: NotificacaoService,
      private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        if (this.value) {
            this.form.patchValue(this.value);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const value: SimpleChange = changes?.value;
        if (value && value.currentValue) {
            this.form.patchValue(value.currentValue);
        } else if (this.FormGroupDirective) {
            this.form.reset();
            this.FormGroupDirective.resetForm();
        }
    }

    handleSubmit() {
        if (this.form.valid) {
            this.appSubmit.emit(new MotivoBaixaViatura(this.form.value));
        } else {
            this.notificacao.error(
                'Não é possível salvar enquanto existirem erros.'
            );
        }
    }

}
