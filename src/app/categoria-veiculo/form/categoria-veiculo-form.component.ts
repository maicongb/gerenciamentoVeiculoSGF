import { CategoriaVeiculo } from './../models/categoria-veiculo.model';
import { NotificacaoService } from './../../core/service/notificacao.service';
import { EventEmitter, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { 
        Component, 
        OnChanges, 
        OnInit, 
        Input, 
        Output } from '@angular/core';

@Component({
  selector: 'app-categoria-veiculo-form',
  templateUrl: './categoria-veiculo-form.component.html',
  styleUrls: ['./categoria-veiculo-form.component.scss']
})
export class CategoriaVeiculoFormComponent implements OnInit, OnChanges {

    form = this.formBuilder.group({
      nome: ['', Validators.required],
      ativo: [null],
    });

    @Input()
    isHidden: boolean

    @Input()
    value: CategoriaVeiculo;

    @Input()
    saveLabel: string;

    @Output()
    appSubmit = new EventEmitter<CategoriaVeiculo>();

    @ViewChild(FormGroupDirective)
    formGroupDirective: FormGroupDirective;

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
        } else if (this.formGroupDirective) {
            this.form.reset();
            this.formGroupDirective.resetForm();
        }
    }

    handleSubmit() {
        if (this.form.valid) {
            this.appSubmit.emit(new CategoriaVeiculo(this.form.value));
        } else {
            this.notificacao.error(
                'Não é possível salvar enquanto existirem erros.'
            );
        }
    }

}
