import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LayoutModule } from './layout/layout.module';
import { NotFoundComponent } from './not-found/not-found/not-found.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, LayoutModule, AppRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
