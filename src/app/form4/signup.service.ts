import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';

interface IUser {
  user: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http: HttpClient) { }

  isNameTaken(user: string) {
    return this.http.get<IUser[]>('assets/email.json').pipe(
      delay(3000),
      map((data: IUser[]) => data.filter(d => d.user === user)),
      map((data: IUser[]) =>  data.length > 0),
      catchError((err) => {
        console.log('error', err);
        return throwError(() => new Error(err));
      })
    )
  }

  isTaken(email: string) {
    return this.http.get<IUser[]>('assets/email.json').pipe(
      delay(2000),
      map((data: IUser[]) => data.filter(d => d.email === email)),
      map((data: IUser[]) =>  data.length > 0),
      catchError((err) => {
        console.log('error', err);
        return throwError(() => new Error(err));
      })
    );
  }
}
