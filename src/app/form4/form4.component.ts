import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { ValidateEmailNotTaken, ValidateUserNotTaken } from './validate-email-not-taken';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.component.html',
  styleUrls: ['./form4.component.scss']
})
export class Form4Component implements OnInit {

  constructor(private fb: FormBuilder, private signupService: SignupService) {}


  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public form: FormGroup;

  ngOnInit(): void {
    this.form  = this.initModel()
    this.formReady.emit(this.form);
  }

  initModel( ) : FormGroup {
    return this.fb.group({
      f4name2: ['', [Validators.required, Validators.maxLength(30)],ValidateUserNotTaken.createValidator(this.signupService)],
      f4email2: ['', [Validators.required, Validators.email],ValidateEmailNotTaken.createValidator(this.signupService)]
    });
  }

}
