import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppCoreModule } from './core/app-core.module';
import { registerLocaleData } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import localePt from '@angular/common/locales/pt';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';



registerLocaleData(localePt, 'pt');

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        AppCoreModule.forRoot(),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt' },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
