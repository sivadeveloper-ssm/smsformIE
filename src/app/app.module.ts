import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {AppBootstrapModule} from './Shared/app-bootstrap.module';

import {DataService} from './services/dataservice';
import {HttpClientModule} from '@angular/common/http';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ArrayClass } from './Class/ArrayClass';
import { Helperclass } from './Class/helperclass';


import {NgxLoadingModule} from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    DataService,
    ArrayClass,
    Helperclass
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
