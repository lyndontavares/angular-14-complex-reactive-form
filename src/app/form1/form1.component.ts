import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthorValidator } from '../author/author.validator';
import { IComponentTab } from '../shared/form-basic';
import { RoomOver18Validator } from './room-over18.validator';


@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form1Component implements OnInit, IComponentTab {

  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  public form: FormGroup;

  rooms = [{text:'room-1',value:'room-1'}, {text:'room-2',value:'room-2'}, {text:'room-3',value:'room-3'}];

  initForm( )  {
    this.form  = this.initModel()
  }

  constructor(
    private _fb: FormBuilder,
    private roomOver18Validator: RoomOver18Validator,
    private authorValidator: AuthorValidator) {}

  ngOnInit() {
    this.initForm();
    this.formReady.emit(this.form);
  }

  initModel( ) : FormGroup {
    return this._fb.group({
      codigo: [null, [Validators.required] ],
      nome: ["", [Validators.required,Validators.maxLength(40),Validators.minLength(10)]],
      endereco: ["rua x", [Validators.required,Validators.minLength(3)]],
      age: ['', [Validators.required, NoNegativeNumbers]],
      room: [{}, Validators.required],
      author: ['', {
        validators: [Validators.required,Validators.minLength(3), ],
        asyncValidators:[ this.authorValidator.checkIfAuthorExists() ],
        updateOn: 'blur'
      }],

    },
    {
      validators: [this.roomOver18Validator.onlyAccessRoomsOver18()],
      updateOn: 'blur',
    }
    );
  }

}

export function NoNegativeNumbers(control: AbstractControl) {
  return control.value < 0 ? { negativeNumber: true } : null;
}
