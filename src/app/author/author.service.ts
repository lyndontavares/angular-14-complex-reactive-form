import { Injectable } from "@angular/core";
import { Observable, of} from 'rxjs';
import { delay} from 'rxjs/operators'

@Injectable()
export class AuthorService {

  private autores = ['Lyndon', 'Marianne'];

  constructor() {}

  existsAuthor(name): Observable<boolean> {
    return of(this.autores.includes(name));
  }

}
