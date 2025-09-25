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
import { CommentModule } from './comment/comment.module';
import { WeeklyHistoryComponent } from './week/weekly-history/weekly-history.component';
import { WeekModule } from './week/week.module';
import { IngredientModule } from './ingredient/ingredient.module';

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
    UserModule,
    CommentModule,
    WeekModule,
    IngredientModule
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
