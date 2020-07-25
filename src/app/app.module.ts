import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AnimalsComponent } from './animals/animals.component';
import { CustomAnimalsComponent } from './custom-animals/custom-animals.component';


@NgModule({
  declarations: [
    AppComponent,
    AnimalsComponent,
    CustomAnimalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
