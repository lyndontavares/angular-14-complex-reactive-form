import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Marca } from './marca.model';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.scss']
})
export class Form3Component implements OnInit {
  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  public form: FormGroup;

  constructor(
    public fb: RxFormBuilder,
   ) {}

  ngOnInit() {
    this.form = this.fb.formGroup(this.getModel())

    this.formReady.emit(this.form);
  }

  getModel(): Marca {
    let marca: Marca = new Marca()
    marca.nome = null
    marca.id = null
    marca.senha = ''
    return marca
  }

  initModel(): FormGroup {
    return this.fb.formGroup(this.getModel())
  }

}
