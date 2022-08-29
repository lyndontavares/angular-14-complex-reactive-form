import { AfterViewInit, Component, HostListener, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { ReactiveFormConfig } from "@rxweb/reactive-form-validators";
import { Subscription } from "rxjs";
import { getFirstAndLastFocusableElements } from "src/app/helpers/dom.helper";
import { ControlTabService } from "./control-tab.service";

export interface IComponentTab {
    initModel: any
}

@Component({ template: '' })
export class FormBasic implements OnInit, AfterViewInit, AfterViewInit {

    $selectedIndex = new Subscription()
    selectedIndex = 0
    selectIndexError = -1
    iniciando = true
    errors = []
    form: FormGroup;
    tabs: IComponentTab[] = []

    constructor(public fb: FormBuilder, public controlTabService: ControlTabService) { }

    ngOnInit() {
        this.form = this.fb.group({
            subforms: this.fb.array([])
        });
        this.$selectedIndex = this.controlTabService.getTabIndex().subscribe(idx => this.selectedIndex = idx)
        ReactiveFormConfig.set({
            validationMessage: {
                required: 'Campo requerido',
                minLength: 'tamaño mínimo: {{1}}',
                maxLength: 'tamaño máximo: {{1}}',
                compare: 'no pasó en la comparación',
                specialCharacter: 'carateres no permitido(s)',
                numeric: 'Solamente caracteres numéricos',
                alpha: 'Solamente caracteres alfabéticos',
                range: 'Rango: Minimo {{1}}, Maximo {{2}}'
            },
        });
    }

    OnDestroy(): void {
        this.$selectedIndex.unsubscribe()
    }

    ngAfterViewInit(): void {
        this.iniciando = false
        this.onTabChange()
        if ( !this.tabs ) console.log('***** DEFINE TABS *****')
    }

    get subforms(): FormArray {
        return this.form.get("subforms") as FormArray
    }

    subformReady(subform: FormGroup) {
        this.subforms.push(subform);
    }

    isSubformValid(index: number) {
        return this.subforms.at(index)?.valid;
    }

    resetForm() {
        this.errors = []
        this.selectedIndex = 0;
        this.selectIndexError = -1;
        for (let i = 0; i < this.subforms.length; i++) {
            this.subforms.at(i).markAsUntouched();
            this.subforms.at(i).setValue(this.tabs[i].initModel().getRawValue())
        }
    }

    doCheck() {
        if (this.form.valid) {
            setTimeout(() => { this.resetForm() }, 2000)
            return
        }
        for (let i = 0; i < this.subforms.length; i++) {
            this.validateAllFormFields(this.subforms.at(i) as FormGroup);
        }
        this.getFormValidationErrors()
        this.firstErro()
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                //console.log(control)
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                //console.log('validateAllFormFields')
                this.validateAllFormFields(control);
            }
        });
    }

    prior() {
        this.selectedIndex = this.selectedIndex > 0 ? this.selectedIndex - 1 : 0
    }

    next() {
        this.selectedIndex = this.selectedIndex < this.subforms.length - 1 ? this.selectedIndex + 1 : 0

    }

    mudarTab(index) {
        this.controlTabService.updateTabIndex(index) //<=Tab General
    }

    setFocusById(id, timeInMileseconds = 400) {
        setTimeout(() => {
            const el = document.querySelectorAll(`#${id}`)
            if (el && el.length > 0) {
                el[el.length - 1]['focus']()
            }
        }, timeInMileseconds)
    }

    setFocusByName(name, timeInMileseconds = 400) {
        setTimeout(() => {
            const el = document.querySelectorAll(`[name="${name}"]`)
            if (el && el.length > 0) {
                el[el.length - 1]['focus']()
            }
        }, timeInMileseconds)
    }

    setFocusByFormControlName(name, timeInMileseconds = 400) {
        setTimeout(() => {
            const el = document.querySelectorAll(`[formcontrolname="${name}"]`)
            if (el && el.length > 0) {
                el[el.length - 1]['focus']()
            }
        }, timeInMileseconds)
    }

    getFormValidationErrors() {
        this.errors = []
        for (let i = 0; i < this.subforms.length; i++) {
            this.doGeError(this.subforms.at(i) as FormGroup, i);
        }
    }

    doGeError(formControl, index) {
        Object.keys(formControl.controls).forEach(key => {
            //console.log(key)
            const controlErrors: ValidationErrors = formControl.get(key)?.errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {

                    const idx = this.errors.map(e => e.desc)?.indexOf(key)
                    if (idx === -1) {
                        this.errors.push({ desc: key, info: [keyError], tabIndex: index })
                    } else {
                        this.errors[idx].info = [...this.errors[idx].info, keyError]
                    }

                });
            }
        });
    }

    firstErro() {
        if (this.errors.length > 0) {
            this.selectIndexError = 0
            this.controlTabService.updateTabIndex(this.errors[this.selectIndexError].tabIndex);
            this.setFocusById(this.errors[0].desc)
        }
    }

    lastErro() {
        if (this.errors.length > 0) {
            this.selectIndexError = this.errors.length - 1
            this.controlTabService.updateTabIndex(this.errors[this.selectIndexError].tabIndex);
            this.setFocusById(this.errors[this.selectIndexError].desc)
        }
    }

    nextErro() {
        if (this.selectIndexError + 1 < this.errors.length) {
            this.selectIndexError++
            this.controlTabService.updateTabIndex(this.errors[this.selectIndexError].tabIndex);
            this.setFocusById(this.errors[this.selectIndexError].desc)
        }
    }

    priorErro() {
        if (this.selectIndexError - 1 >= 0) {
            this.selectIndexError--
            this.controlTabService.updateTabIndex(this.errors[this.selectIndexError].tabIndex);
            this.setFocusById(this.errors[this.selectIndexError].desc)
        }
    }

    @HostListener('window:keydown.alt.m')
    public onProximo(): void {
        this.next()
    }

    @HostListener('window:keydown.alt.n')
    public onPrior(): void {
        this.prior()
    }

    @HostListener('window:keydown.alt.s')
    public onVaidar(): void {
        this.doCheck()
    }

    onTabChange() {
        setTimeout(() => {
            const id = document.querySelectorAll(`#tabControl`)[0]
            const el = getFirstAndLastFocusableElements(id)
            if (el.firstFocusableElement) {
                el.firstFocusableElement['focus']()
            }
        }, 200)
    }

}
