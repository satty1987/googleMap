import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgpMcqModule } from 'ngp-mcq';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AutocompleteComponent } from './autocomplete';
import { AgmcomponentComponent } from './components/agmcomponent/agmcomponent.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { environment } from 'src/environments/environment';
import { TheaterComponent } from './components/theater/theater.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { BusinessContactComponent } from './components/business-contact/business-contact.component';
import { TrimInputDirective } from './trim-input.directive';
import { BusinessInformationComponent } from './components/business-information/business-information.component';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    AgmcomponentComponent,
    TheaterComponent,
    ValidationMessageComponent,
    BusinessContactComponent,
    TrimInputDirective,
    BusinessInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    NgpMcqModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.APIKEY
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
