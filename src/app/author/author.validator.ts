import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AuthorService } from './author.service';

@Injectable()
export class AuthorValidator {

    constructor(private authorService: AuthorService ) { }

    checkIfAuthorExists(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {

            // sol.1: acessando formarray
            // torna form acoplado
            const rule2AuthorDeveSerDiferenteNomeTab1 = control.parent.controls['nome']?.value  !== control.value
            const ruleAuthorDeveSerDiferenteNomeTab3 =  control.parent.parent?.controls[2]?.controls['nome']?.value !== control.value

            // sol.2: pode ser injetado servico de contexto
            // redunbante! continua acoplamento
            // const subforms = this.context.getContext().form.get('subforms') as FormArray
            // console.log( subforms.at(2).value.nome )

            // sol3. para regras cruzadas utilizar o form principal e abstrair regras dos dormularios
            // gerando desacoplamento e reduzindo redundancia de codigo e promovendo isolamento

            return this.authorService
                .existsAuthor(control.value)
                .pipe(
                    map((result: boolean) =>
                        !rule2AuthorDeveSerDiferenteNomeTab1 ? { 'nameEqualAtuhor': true } :
                        ( !ruleAuthorDeveSerDiferenteNomeTab3) ? { 'nameTab3EqualAtuhor': true } :
                        ( !result ? null : { 'existAtuhor': true } ) //rule1
                    )
                );
        }
    }

}
