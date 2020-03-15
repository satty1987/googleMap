import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AutocompleteComponent } from './autocomplete';
import { AgmcomponentComponent } from './components/agmcomponent/agmcomponent.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    AgmcomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCRH6YL5meJxd_e8uFLQ6Rt6xFAYCDlfmY'
    })
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
