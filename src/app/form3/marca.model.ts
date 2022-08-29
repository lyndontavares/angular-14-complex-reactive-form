import { FormControl } from "@angular/forms";
import { async, prop, required, trim } from "@rxweb/reactive-form-validators";

export class Marca {

    static mode='add'
    @prop()
    id: number;

    @async([regraCruzada])
    @required()
    nome: string;

    @prop()
    @async([isEditMode])
    @trim()
    senha: string;
}

function regraCruzada(control: FormControl) {
    let promise;
    promise = new Promise((resolve, reject) => {

        //regra cruzada: atualiza o componente author na tab 1 que tem validação cruzada com nome na tab.3
        control.parent.parent?.controls[0]?.controls['author']?.updateValueAndValidity()

        resolve(null)

    });

    return promise
}


function isEditMode(control: FormControl) {
    let promise;

    promise = new Promise((resolve, reject) => {
        if ( Marca.mode === 'add' ) {
            if (!control.value) {
                resolve({ 'async': { message: 'Senha requerida' } })
            } else {
                resolve(null)
            }
        } else {
            resolve(null)
        }
    });

    return promise
}
