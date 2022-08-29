import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserValidators } from './user.validator';

@Component({
  selector: 'app-form5',
  templateUrl: './form5.component.html',
  styleUrls: ['./form5.component.scss']
})
export class Form5Component implements OnInit {

  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: UserValidators
  ) { }

  ngOnInit(): void {
    this.form  = this.initModel()
    this.formReady.emit(this.form);
  }

  initModel( ) : FormGroup {

    /* Assim:  return  this.fb.group({
      'obs':   [ null ],
      'name3': [ null, [ Validators.required, Validators.minLength(3) ] , this.service.userValidator()],
    });  ou */

    return this.fb.group({
      'obs': [ null ],
      'name3': [ null, {
        updateOn: 'blur',
        validators:[ Validators.required, Validators.minLength(3)],
        asyncValidators: [this.service.userValidator()]}
      ]
    });

  }

}



/*

https://stackoverflow.com/questions/42394999/why-should-i-use-validators-compose

I know this is an old-ish question, but it came up on a recent search.

The main reason you may want to use Validators.compose() is to reuse multiple validators. Let's say you want to check that a value is between 0 and 100. The first time, you would write:

this.form = this.fb.group({
  foo: [ 0, [ Validators.min(0), Validators.max(100)]]
});
Now let's say you want to do that in several places within your app. To avoid code duplication, you would create your own validator by simply composing it from the existing validators, expose it and reuse it everywhere you need:

// custom-validators.ts
import { Validators } from '@angular/forms';
export class CustomValidators {
  readonly betweenZeroHundred = Validators.compose([
    Validators.min(0),
    Validators.max(100),
  ]);
}

// form1
this.form = this.fb.group({
  foo: [ 0, [CustomValidators.betweenZeroHundred()]]
});

// form2
this.form = this.fb.group({
  bar: [ 100, [CustomValidators.betweenZeroHundred()]]
});

Nowadays, with the spread operator, you can achieve a similar result, without the compose():


export class CustomValidators {
  readonly betweenZeroHundred = [Validators.min(0), Validators.max(100)];
}

this.form = this.fb.group({
  bar: [ 100, [...CustomValidators.betweenZeroHundred, Validators.required]]
});

In the end, it's a matter of which approach is a better fit for your team and your situation.



*/
