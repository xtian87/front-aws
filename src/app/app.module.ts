import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './_services/token.interceptor.service';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { StatusComponent } from './pages/login/status/status.component';
import { SurveryComponent } from './pages/survery/survery.component';
import { BodyComponent } from './pages/body/body.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StatusComponent,
    BodyComponent,
    SurveryComponent
  ],
  entryComponents: [
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
