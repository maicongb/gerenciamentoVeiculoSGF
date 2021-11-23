import { NotificacaoService } from './../../core/service/notificacao.service';
import { TipoVistoria } from './../models/tipo-vistoria.model';
import { Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { Component, 
         EventEmitter, 
         Input, 
         OnChanges, 
         OnInit, 
         Output, 
         ViewChild, 
         SimpleChange, 
         SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tipo-vistoria-form',
  templateUrl: './tipo-vistoria-form.component.html',
  styleUrls: ['./tipo-vistoria-form.component.scss']
})
export class TipoVistoriaFormComponent implements OnInit, OnChanges {

  form = this.formBuilder.group({
    nome: ['', Validators.required],
    ativo: [null],
  });

  @Input()
  isHidden: boolean

  @Input()
  value: TipoVistoria;

  @Input()
  saveLabel: string;

  @Output()
  appSubmit = new EventEmitter<TipoVistoria>();

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
          this.appSubmit.emit(new TipoVistoria(this.form.value));
      } else {
          this.notificacao.error(
              'Não é possível salvar enquanto existirem erros.'
          );
      }
  }

}
