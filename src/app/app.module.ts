import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenuModule } from '@progress/kendo-angular-menu';
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { PopupModule } from '@progress/kendo-angular-popup';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';

import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { GridComponent } from './components/grid/grid.component';
import { BlankComponent } from './components/blank/blank.component';
import { LoginComponent } from './login/login.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ContentComponent } from './main/content/content.component';
import { MainComponent } from './main/main.component';
import { ClubComponent } from './main/club/club.component';
import { EditClubComponent } from './main/club/edit.club/edit.club.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    GridComponent,
    BlankComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ContentComponent,
    MainComponent,
    ClubComponent,
    EditClubComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MenuModule,
    BrowserAnimationsModule,
    GridModule,
    ChartsModule,
    AppRoutingModule,
    DropDownsModule,
    PopupModule,
    InputsModule,
    LabelModule,
    ButtonsModule,
    SchedulerModule,
    NotificationModule,
    DialogModule,
    IndicatorsModule,
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
