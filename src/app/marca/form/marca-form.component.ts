import { TipoVeiculoService } from './../../tipo-veiculo/tipo-veiculo.service';
import { MarcaVeiculo } from './../models/marca.model';
import { TipoVeiculo } from './../../tipo-veiculo/models/tipo-veiculo.model';
import { Observable } from 'rxjs';
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
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html',
  styleUrls: ['./marca-form.component.scss']
})
export class MarcaFormComponent implements OnInit, OnChanges {

    @Input()
    tiposVeiculos$: Observable<TipoVeiculo[]>;

    form = this.formBuilder.group({
        nome: ['', Validators.required],
        abreviacao: ['', Validators.required],
        tipoVeiculo: this.formBuilder.group({
            id: [null, Validators.required],
        }),
        ativo: [null],
    });

    @Input()
    isHidden: boolean

    @Input()
    value: MarcaVeiculo;

    @Input()
    saveLabel: string;

    @Output()
    appSubmit = new EventEmitter<MarcaVeiculo>();

    @ViewChild(FormGroupDirective)
    formGroupDirective: FormGroupDirective;

    constructor(
      private notificacao: NotificacaoService,
      private formBuilder: FormBuilder,
      private tipoVeiculo: TipoVeiculoService,
    ) {}

    ngOnInit(): void {
        
        this.tiposVeiculos$ = this.tipoVeiculo
                                        .getTipoVeiculo();

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
            this.appSubmit.emit(new MarcaVeiculo(this.form.value));
        } else {
            this.notificacao.error(
                'Não é possível salvar enquanto existirem erros.'
            );
        }
    }

}
