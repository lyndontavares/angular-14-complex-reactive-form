import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss']
})
export class Form2Component implements OnInit {
  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  public form: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.form = this. initModel();
    this.formReady.emit(this.form);
  }

  initModel(): FormGroup {
    return this._fb.group({
      email: [null, Validators.required],
      fone: [null, [ Validators.required, ValidatePhone ]]
    });
  }

}

function  ValidatePhone(control: AbstractControl): {[key: string]: any} | null  {
  if (control.value && control.value.length != 10) {
    return { 'phoneNumberInvalid': true };
  }
  return null;
}
