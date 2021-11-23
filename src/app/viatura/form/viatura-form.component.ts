import { Viatura } from './../models/viatura.model';
import { UpmService } from './../../upm/upm.service';
import { Upm } from './../../upm/models/upm.model';
import { UnidadeFederativaService } from './../../unidade-federativa/unidade-federativa.service';
import { TipoViaturaService } from './../../tipo-viatura/tipo-viatura.service';
import { TipoCombustivelService } from './../../tipo-combustivel/tipo-combustivel.service';
import { ModeloService } from './../../modelo/modelo.service';
import { TipoViatura } from './../../tipo-viatura/models/tipo-viatura.model';
import { TipoCombustivel } from './../../tipo-combustivel/models/tipo-combustivel.model';
import { ModeloVeiculo } from './../../modelo/models/modelo.model';
import { UnidadeFederativa } from './../../unidade-federativa/models/unidade-federativa.model';
import { Observable } from 'rxjs';
import { NotificacaoService } from '../../core/service/notificacao.service';
import { EventEmitter, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Validators, FormGroupDirective, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { 
        Component, 
        OnChanges, 
        OnInit, 
        Input, 
        Output } from '@angular/core';

@Component({
  selector: 'app-viatura-form',
  templateUrl: './viatura-form.component.html',
  styleUrls: ['./viatura-form.component.scss']
})
export class ViaturaFormComponent implements OnInit, OnChanges {

  
  @Input()
  unidadeFederativa$: Observable<UnidadeFederativa[]>;

  @Input()
  modeloVeiculo$: Observable<ModeloVeiculo[]>;

  @Input()
  tipoCombustivel$: Observable<TipoCombustivel[]>;

  @Input()
  tipoViatura$: Observable<TipoViatura[]>;

  @Input()
  upm$: Observable<Upm[]>;

  form = this.formBuilder.group({
      placa: ['', [Validators.required, Validators.minLength(7) ]],
      ufPlaca: this.formBuilder.group({
        id: [null, Validators.required],
      }),
      renavam: ['', Validators.required],
      chassi: ['', Validators.required],
      numeroMotor: ['', Validators.required],
      anoFabricacao: [null, [Validators.required, Validators.minLength(4)]],
      anoModelo: [null, [Validators.required, Validators.minLength(4)]],
      modeloVeiculo: this.formBuilder.group({
        id: [null, Validators.required],
      }),
      tipoCombustivel: this.formBuilder.group({
        id: [null, Validators.required],
      }),
      cor: ['', Validators.required],
      prefixo: ['', Validators.required],
      tipoViatura: this.formBuilder.group({
        id: [null, Validators.required],
      }),
      viaturaUpmId: [null],
      odometro: ['', Validators.required],
      dtProximaRevisao: [null, Validators.required],
      odometroProximaRevisao: ['', Validators.required],
      dtAquisicao: [null, Validators.required],
      dtInclusao: [null, Validators.required],
      numeroSei: ['', Validators.required],
      tombamento: ['', Validators.required],
      siglaUpm:[''],
    });

  @Input()
  saveLabel: string;

  @Input()
  isNovo = true;

  @Input()
  value: Viatura;

  @Output()
  appSubmit = new EventEmitter<Viatura>();

  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;

  minDate = new Date();

  constructor(
    private notificacao: NotificacaoService,
    private formBuilder: FormBuilder,
    private unidadeFederativaService: UnidadeFederativaService,
    private modeloVeiculoService: ModeloService,
    private tipoCombustivelService: TipoCombustivelService,
    private tipoViaturaService: TipoViaturaService,
    private upmService: UpmService,
  ) {}

  ngOnInit(): void {
      
      this.unidadeFederativa$ = this.unidadeFederativaService.getBuscarUnidadeFederativaAtivas();

      this.modeloVeiculo$ = this.modeloVeiculoService.getBuscarModelosVeiculosAtivos();

      this.tipoCombustivel$ = this.tipoCombustivelService.getBuscarTipoCombustivelAtivos();

      this.tipoViatura$ = this.tipoViaturaService.getBuscarTipoViauraAtivas();

      this.upm$ = this.upmService.getBuscarUpmsAtivas();

      if (this.value) {
          this.form.patchValue(this.value);
      }

  }

  ngOnChanges(changes: SimpleChanges): void {
      const value: SimpleChange = changes?.value;     
      if (value && value.currentValue) {
          this.isNovo = false;
          this.form.patchValue(value.currentValue);
      } else if (this.formGroupDirective) {
          this.form.reset();
          this.formGroupDirective.resetForm();
      }
  }

  handleSubmit() {
      if(this.isNovo && this.form.get('viaturaUpmId').value === null) {
        this.notificacao.error(
            'O campo Upm é obrigatório.'
        );
      }  else if (this.form.valid) {
            this.appSubmit.emit(new Viatura(this.form.value));
          } else {
              this.notificacao.error(
                  'Não é possível salvar enquanto existirem erros.'
              );
          }
  }

}
