import { CategoriaVeiculoService } from './../../categoria-veiculo/categoria-veiculo.service';
import { MarcaService } from './../../marca/marca.service';
import { CategoriaVeiculo } from './../../categoria-veiculo/models/categoria-veiculo.model';
import { MarcaVeiculo } from './../../marca/models/marca.model';
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
  selector: 'app-modelo-form',
  templateUrl: './modelo-form.component.html',
  styleUrls: ['./modelo-form.component.scss']
})
export class ModeloFormComponent implements OnInit, OnChanges {

    @Input()
    marcasVeiculos$: Observable<MarcaVeiculo[]>;

    @Input()
    categoriasVeiculos$: Observable<CategoriaVeiculo[]>;

    form = this.formBuilder.group({
        nome: ['', Validators.required],
        potencia: ['', Validators.required],
        tanque: ['', Validators.required],
        marcaVeiculo: this.formBuilder.group({
            id: [null, Validators.required],
        }),
        categoriaVeiculo: this.formBuilder.group({
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
      private marcaVeiculoService: MarcaService,
      private categoriaService: CategoriaVeiculoService,
    ) {}

    ngOnInit(): void {
        
        this.marcasVeiculos$ = this.marcaVeiculoService.getMarca();

        this.categoriasVeiculos$ = this.categoriaService.getCategoria();

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
