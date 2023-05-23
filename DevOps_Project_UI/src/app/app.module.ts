import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { RegisterComponentComponent } from './components/register-component/register-component.component';

import { StudentServicesService } from './services/student/student-services.service';
import { ComputerServicesService } from './services/computer/computer-services.service';
import { FineServicesService } from './services/fine/fine-services.service';
import { LoanServicesService } from './services/loan/loan-services.service';

import{ authGuardGuard } from './guards/auth-guard.guard'
import { TokenInterceptorServiceService } from './services/tokenInterceptor/token-interceptor-service.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    RegisterComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [StudentServicesService, ComputerServicesService, FineServicesService, LoanServicesService,  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorServiceService, multi:true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
