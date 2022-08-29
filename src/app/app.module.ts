import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorService } from './author/author.service';
import { AuthorValidator } from './author/author.validator';
import { Form1Component } from './form1/form1.component';
import { Form2Component } from './form2/form2.component';
import { MaterialModule } from './shared/material.module';
import { Form3Component } from './form3/form3.component';
import { Form4Component } from './form4/form4.component';
import { Form5Component } from './form5/form5.component';

@NgModule({
  declarations: [
    AppComponent,
    Form1Component,
    Form2Component,
    Form3Component,
    Form4Component,
    Form5Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    RxReactiveFormsModule,
  ],
  providers: [
    AuthorService,
    AuthorValidator,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } } //outline fill legacy standart
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
