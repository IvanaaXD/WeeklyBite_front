import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { I18nPluralPipe } from '@angular/common';
import { Interceptor } from './infrastructure/auth/interceptor';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    HttpClientModule,
    LayoutModule,
    RecipeModule,
    ReactiveFormsModule,
    UserModule
  ],
  providers: [
    I18nPluralPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
